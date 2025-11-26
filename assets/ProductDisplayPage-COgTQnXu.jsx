import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import CardProductItem from '../components/CardProduct'

import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import placeholderImg from '../assets/empty_cart.webp'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'
import { normalizeImageArray } from '../utils/normalizeImageUrl'


const ProductDisplayPage = () => {
  const params = useParams()
  const categoryData = useSelector((state) => state.product.allCategory) || []
  const [productId, setProductId] = useState(params?.product?.split("-")?.slice(-1)[0])

  // Ensure we have a clean product ID
  useEffect(() => {
    if (params?.product) {
      const newProductId = params.product.split("-").slice(-1)[0];
      console.log('Product ID from URL:', newProductId);
      if (newProductId !== productId) {
        setProductId(newProductId);
      }
    }
  }, [params, productId]);
  const [data, setData] = useState({
    name: "",
    image: [],
    price: 0,
    discount: 0,
    unit: '',
    stock: 0,
    more_details: {},
    category: ''
  })

  const findCategoryByName = (catName) => {
    if (!categoryData.length) return null;
    return categoryData.find(c => (c.name || '').toLowerCase().includes(catName.toLowerCase()));
  }
  const [image, setImage] = useState(0)
  const mainImageRef = useRef()
  const [isZoomVisible, setIsZoomVisible] = useState(false)
  const [zoomBgPos, setZoomBgPos] = useState('50% 50%')
  const ZOOM_LEVEL = 2.5 // multiplier for background-size
  const [loading, setLoading] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [currentCategory, setCurrentCategory] = useState('')
  // lists for category sections
  const [dairyProducts, setDairyProducts] = useState([])
  const [fruitsProducts, setFruitsProducts] = useState([])
  const imageContainer = useRef()
  const [selectedUnit, setSelectedUnit] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const mainImageStyle = {
    cursor: 'crosshair',
    width: '480px',
    height: '480px',
    position: 'relative',
    userSelect: 'none',
    objectFit: 'contain'
  }

  const thumbImageStyle = {
    cursor: 'crosshair',
    position: 'relative',
    userSelect: 'none'
  }

  const handleMainMouseMove = (e) => {
    if (!mainImageRef.current) return
    const rect = mainImageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const py = Math.max(0, Math.min(100, (y / rect.height) * 100))
    setZoomBgPos(`${px}% ${py}%`)
  }

  const handleMainMouseEnter = () => {
    setIsZoomVisible(true)
  }

  const handleMainMouseLeave = () => {
    setIsZoomVisible(false)
  }

  const fetchRelatedProducts = async (categoryId, categoryName, subCategoryId = null, subCategoryName = null, productName = '') => {
    console.log('Fetching related products for:', { categoryId, categoryName, subCategoryId, subCategoryName, productName });
    try {
      let results = []

      // Normalize ids in case populated objects were passed
      const normCatId = categoryId && typeof categoryId === 'object' ? (categoryId._id || categoryId) : categoryId
      const normSubId = subCategoryId && typeof subCategoryId === 'object' ? (subCategoryId._id || subCategoryId) : subCategoryId
      console.debug('Normalized related-products ids:', { normCatId, normSubId })

      const pushUnique = (items = []) => {
        for (const it of items) {
          if (!it) continue
          if (String(it._id) === String(productId)) continue // exclude current product
          if (!results.find(r => String(r._id) === String(it._id))) results.push(it)
        }
      }

      // 1) Try subcategory+category (best match)
      if (normCatId && normSubId) {
        console.debug('Trying subcategory+category endpoint with', { categoryId: normCatId, subCategoryId: normSubId })
        const res = await Axios.post(SummaryApi.getProductByCategoryAndSubCategory.url, {
          categoryId: normCatId,
          subCategoryId: normSubId,
          limit: 24
        })
        if (res?.data?.success && Array.isArray(res.data.data)) {
          pushUnique(res.data.data)
          console.debug('Subcategory+category returned', res.data.data.length, 'items')
        } else {
          console.debug('Subcategory+category returned no items or unexpected shape', res?.data)
        }
      }

      // 2) Try category-only
      if (normCatId) {
        console.debug('Trying category-only endpoint with', { id: normCatId })
        const res = await Axios.post(SummaryApi.getProductByCategory.url, {
          id: normCatId,
          limit: 24
        })
        if (res?.data?.success && Array.isArray(res.data.data)) {
          pushUnique(res.data.data)
          console.debug('Category-only returned', res.data.data.length, 'items')
        } else {
          console.debug('Category-only returned no items or unexpected shape', res?.data)
        }
      }

      // 3) Fallback: name-based search using productName or subCategoryName
      if (results.length === 0) {
        const query = (productName && productName.trim()) ? productName.split(' ').slice(0, 3).join(' ') : (subCategoryName || categoryName || '')
        if (query) {
          const searchRes = await Axios.post(SummaryApi.searchProduct.url, {
            search: query,
            limit: 24
          })
          if (searchRes?.data?.success && Array.isArray(searchRes.data.data)) {
            pushUnique(searchRes.data.data)
            console.debug('Name-based search returned', searchRes.data.data.length, 'items')
          } else {
            console.debug('Name-based search returned no items or unexpected shape', searchRes?.data)
          }
        }
      }

      // If we have a subcategory id, strictly keep only items that belong to that subcategory
      if (normSubId && results.length > 0) {
        const filtered = results.filter(p => {
          const subs = Array.isArray(p.subCategory) ? p.subCategory : []
          return subs.some(s => String(s._id || s) === String(normSubId))
        })
        console.debug('Filtered related products by subcategory:', filtered.length, 'items (from', results.length, ')')
        results = filtered
      }

      console.debug('Total related products found:', results.length)
      setRelatedProducts(results)
      // Set heading. If caller didn't provide names, try to derive them from returned products
      let finalCategoryName = categoryName || ''
      let finalSubCategoryName = subCategoryName || ''

      if ((!finalCategoryName || !finalSubCategoryName) && results.length > 0) {
        const candidate = results.find(r => r)
        if (candidate) {
          const candCat = Array.isArray(candidate.category) ? candidate.category[0] : candidate.category
          const candSub = Array.isArray(candidate.subCategory) ? candidate.subCategory[0] : candidate.subCategory

          if (!finalCategoryName && candCat) {
            if (typeof candCat === 'object' && candCat.name) finalCategoryName = candCat.name
            else if (typeof candCat === 'string') {
              const lookup = categoryData.find(c => String(c._id) === String(candCat))
              if (lookup) finalCategoryName = lookup.name
            }
          }

          if (!finalSubCategoryName && candSub) {
            if (typeof candSub === 'object' && candSub.name) finalSubCategoryName = candSub.name
          }
        }
      }

      if (finalCategoryName && finalSubCategoryName) setCurrentCategory(`${finalCategoryName} — ${finalSubCategoryName}`)
      else if (finalCategoryName) setCurrentCategory(finalCategoryName)
      else if (finalSubCategoryName) setCurrentCategory(finalSubCategoryName)
      else if (productName) setCurrentCategory('Similar products')
      else setCurrentCategory('Related Products')
    } catch (error) {
      console.error('Error fetching related products:', error);
      setRelatedProducts([]);
    }
  };

  // accept an optional id param so callers can pass the id immediately
  const fetchProductDetails = async (idParam) => {
    const idToUse = idParam || productId
    if (!idToUse) {
      console.error('No product ID available');
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching product details for ID:', idToUse);
      const response = await Axios.post(SummaryApi.getProductDetails.url, {
        productId: idToUse
      });

      console.log('Raw API response:', response);
      const responseData = response.data;
      console.log('Product details response:', responseData);

      if (responseData.success) {
        // normalize image paths so Vite can load local assets returned as 'src/assets/...'
        const normalized = {
          ...responseData.data,
          image: normalizeImageArray(responseData.data.image || [])
        }
        console.log('Normalized product data:', normalized);
        setData(normalized);
        // default selected unit
        setSelectedUnit(responseData.data.unit || null);
        // reset displayed image to first one whenever new product loads
        setImage(0);

        // Fetch related products using category or subcategory information if available
        // Normalize category/subCategory entries to extract id and name reliably whether the API returned objects or ids
        const rawCategory = Array.isArray(responseData.data.category) && responseData.data.category.length > 0
          ? responseData.data.category[0]
          : null;

        const rawSubCat = Array.isArray(responseData.data.subCategory) && responseData.data.subCategory.length > 0
          ? responseData.data.subCategory[0]
          : null;

        const normalizeEntity = (ent) => {
          if (!ent) return null;
          // ent might be an id string, or an object with _id and name, or a populated object
          if (typeof ent === 'string') return { _id: ent, name: '' };
          if (typeof ent === 'object') {
            return { _id: ent._id || ent, name: ent.name || '' };
          }
          return null;
        };

        let category = normalizeEntity(rawCategory);
        let subCat = normalizeEntity(rawSubCat);

        // If category missing but subCategory has parent category info, try to infer it from subCat.category
        if ((!category || !category._id) && subCat && subCat._id) {
          // subCat may itself be a populated object in the original response; attempt to read its category field
          const originalSub = Array.isArray(responseData.data.subCategory) && responseData.data.subCategory.length > 0
            ? responseData.data.subCategory[0]
            : null;
          if (originalSub && Array.isArray(originalSub.category) && originalSub.category.length > 0) {
            const inferredCategoryId = originalSub.category[0];
            const inferredCategory = categoryData.find(c => String(c._id) === String(inferredCategoryId));
            if (inferredCategory) {
              category = { _id: inferredCategory._id, name: inferredCategory.name };
            } else {
              category = { _id: inferredCategoryId, name: '' };
            }
          }
        }

        if (category || subCat) {
          console.log('Fetching related products for normalized:', { category, subCat });
          await fetchRelatedProducts(category?._id, category?.name, subCat?._id, subCat?.name, responseData.data.name);
        }
      } else {
        console.error('Failed to fetch product details:', responseData);
        // Set some defau lt data to prevent blank screen
        setData({
          name: "Product not found",
          image: [],
          price: 0,
          discount: 0,
          unit: '',
          stock: 0,
          more_details: {},
          category: ''
        });
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      AxiosToastError(error);
      // Set some default data to prevent blank screen
      // If server returned 404, show 'Product not found'
      const status = error?.response?.status
      if (status === 404) {
        setData({
          name: "Product not found",
          image: [],
          price: 0,
          discount: 0,
          unit: '',
          stock: 0,
          more_details: {},
          category: ''
        })
      } else {
        setData({
          name: "Error loading product",
          image: [],
          price: 0,
          discount: 0,
          unit: '',
          stock: 0,
          more_details: {},
          category: ''
        })
      }
    } finally {
      setLoading(false);
    }
  }

  // whenever API images change reset image index to 0
  useEffect(() => {
    setImage(0)
  }, [data.image])

  useEffect(() => {
    const loadProduct = async () => {
      if (params?.product) {
        const id = params.product.split("-").slice(-1)[0];
        console.log('Triggering product details fetch for ID:', id);
        await fetchProductDetails(id);
      }
    };
    // call loader which handles async fetch
    loadProduct();
  }, [params?.product]) // Dependencies changed to watch the full product param

  const loadProducts = async () => {
    try {
      setLoading(true);
      console.log('Loading products...');

      // Fetch categories first
      const catResponse = await Axios.get(SummaryApi.getCategory.url);
      console.log('Category response:', catResponse?.data);

      if (!catResponse?.data?.success) {
        console.error('Failed to fetch categories');
        return;
      }

      const categories = catResponse.data.data;

      // Find dairy category
      const dairyCat = categories.find(c =>
        (c.name || '').toLowerCase().includes('dairy') ||
        (c.name || '').toLowerCase().includes('bread') ||
        (c.name || '').toLowerCase().includes('egg')
      );

      // Find fruits category
      const fruitsCat = categories.find(c =>
        (c.name || '').toLowerCase().includes('fruit') ||
        (c.name || '').toLowerCase().includes('vegetables')
      );

      console.log('Found categories:', { dairyCat, fruitsCat });

      // Fetch both category products in parallel
      const [dairyRes, fruitsRes] = await Promise.all([
        dairyCat ? Axios.post(SummaryApi.getProductByCategory.url, {
          id: dairyCat._id
        }) : Promise.resolve({ data: { success: false } }),

        fruitsCat ? Axios.post(SummaryApi.getProductByCategory.url, {
          id: fruitsCat._id
        }) : Promise.resolve({ data: { success: false } })
      ]);

      console.log('API Responses:', {
        dairy: dairyRes?.data,
        fruits: fruitsRes?.data
      });

      // Set dairy products
      if (dairyRes?.data?.success && Array.isArray(dairyRes.data.data)) {
        const products = dairyRes.data.data;
        console.log('Setting dairy products:', products);
        setDairyProducts(products);
      }

      // Set fruits products
      if (fruitsRes?.data?.success && Array.isArray(fruitsRes.data.data)) {
        const products = fruitsRes.data.data;
        console.log('Setting fruits products:', products);
        setFruitsProducts(products);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Load products when component mounts or when categoryData changes
  useEffect(() => {
    console.log('Loading products with categoryData:', categoryData);
    loadProducts();
  }, [categoryData]);

  // derive cart quantity and display price so the page updates when AddToCartButton changes qty
  const cart = useSelector(state => state.cartItem.cart)
  const sameId = (a, b) => String(a) === String(b)
  const cartEntry = Array.isArray(cart) ? cart.find(item => sameId(item?.productId?._id, data._id)) : null
  const qtyInCart = cartEntry?.quantity || 0
  const unitPrice = pricewithDiscount(data.price || 0, data.discount || 0)
  const totalDiscounted = unitPrice * (qtyInCart > 0 ? qtyInCart : 1)
  const totalOriginal = (data.price || 0) * (qtyInCart > 0 ? qtyInCart : 1)
  const displayPrice = DisplayPriceInRupees(totalDiscounted)

  const handleScrollRight = () => {
    if (!imageContainer.current) return
    imageContainer.current.scrollBy({ left: 140, behavior: 'smooth' })
  }
  const handleScrollLeft = () => {
    if (!imageContainer.current) return
    imageContainer.current.scrollBy({ left: -140, behavior: 'smooth' })
  }
  console.log("product data", data)
  return (
    <section className='w-full min-h-screen bg-white'>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Left Column */}
        <div>
          {/* Main Product Image */}
          <div className='bg-white lg:min-h-[70vh] lg:max-h-[80vh] rounded min-h-56 max-h-96 h-full w-full shadow-sm flex items-center justify-center overflow-hidden'>
            <div
              ref={mainImageRef}
              onMouseMove={handleMainMouseMove}
              onMouseEnter={handleMainMouseEnter}
              onMouseLeave={handleMainMouseLeave}
              className='relative flex items-center justify-center'
              style={{ width: mainImageStyle.width, height: mainImageStyle.height }}
            >
              <img
                src={(data.image && data.image.length > 0 ? (data.image[image] || placeholderImg) : placeholderImg) || placeholderImg}
                alt={data.name}
                className='object-contain'
                style={mainImageStyle}
              />

              {/* zoom panel removed from here and relocated to the right column */}
            </div>
          </div>

          {/* Thumbnails with arrows */}
          <div className='grid relative'>
            {/* Left arrow */}
            <button
              aria-label='Scroll left'
              onClick={handleScrollLeft}
              className='absolute left-[88px] top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4l-6 6 6 6" />
              </svg>
            </button>

            <div className='flex justify-center w-full'>
              <div ref={imageContainer} className='flex gap-3 overflow-x-auto overflow-y-visible px-3 py-2 scroll-smooth'>
                {(data.image && data.image.length > 0 ? data.image : []).map((img, index) => (
                  <div
                    className={`w-[36px] h-[36px] md:w-[64px] md:h-[64px] flex-shrink-0 rounded-md overflow-visible bg-white shadow-sm p-1 cursor-pointer ${index === image ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-white' : ''}`}
                    key={img + index}
                    onClick={() => setImage(index)}
                  >
                    <img
                      src={img || placeholderImg}
                      alt={`thumbnail-${index}`}
                      className='w-full h-full object-contain'
                      style={thumbImageStyle}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right arrow */}
            <button
              aria-label='Scroll right'
              onClick={handleScrollRight}
              className='absolute right-[88px] top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4l6 6-6 6" />
              </svg>
            </button>
          </div>

          {/* View More Details Section */}
          <div className='my-4 grid gap-3'>
            <div className='flex items-center'>
              <button onClick={() => setShowDetails(s => !s)} className='text-green-600 flex items-center gap-2 ml-[100px]'>
                <span>View more details</span>
                <svg className={`w-4 h-4 transform ${showDetails ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 8L10 13L15 8" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            {showDetails && (
              <div className='ml-[100px]'>
                <div>
                  <p className='text-base text-neutral-600'>{data.description}</p>
                </div>
                <div>
                  <p className='font-semibold'>Unit</p>
                  <p className='text-base'>{data.unit}</p>
                </div>
                {data?.more_details && Object.keys(data?.more_details).map((element, index) => (
                  <div key={element + index}>
                    <p className='font-semibold'>{element}</p>
                    <p className='text-base'>{data?.more_details[element]}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className='p-4 lg:pl-7 text-base lg:text-lg'>
          {/* Zoom panel shown on the right side (desktop) */}
          <div className='hidden lg:block mb-4'>
            <div
              aria-hidden
              style={{
                // Increased size: width slightly larger and height increased to match thumbnails
                width: 520,
                height: 560,
                borderRadius: 6,
                backgroundImage: `url(${(data.image && data.image.length > 0 ? (data.image[image] || '') : '')})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: isZoomVisible ? `${ZOOM_LEVEL * 100}%` : '100%',
                backgroundPosition: zoomBgPos,
                boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                display: isZoomVisible ? 'block' : 'none'
              }}
            />
          </div>
          {/* Hide all right-column content below the zoom panel while zoom panel is visible */}
          {!isZoomVisible && (
            <>
              <div className='text-sm text-neutral-500'>
                Home / Fresh Vegetables / <span className='text-black'>{data.name}</span>
              </div>
              <p className='bg-green-300 text-green-800 w-fit px-3 py-1 rounded-full text-sm font-semibold mt-2'>13 MINS</p>
              <h2 className='text-lg font-semibold lg:text-3xl mt-3'>{data.name}</h2>
              <p className='text-sm text-neutral-600 mt-1'>{data.unit}</p>
              <Divider />

              {/* Unit Selection */}
              <div className='mt-3'>
                <p className='font-medium text-sm mb-2'>Select Unit</p>
                <div className='flex gap-3 flex-wrap'>
                  <button
                    onClick={() => setSelectedUnit(data.unit)}
                    className={`px-4 py-2 rounded border ${selectedUnit === data.unit ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white'} text-sm`}
                  >
                    {data.unit || 'Default'}
                  </button>
                  <button
                    onClick={() => setSelectedUnit('2 x (' + (data.unit || 'unit') + ')')}
                    className={`px-4 py-2 rounded border ${selectedUnit && selectedUnit.includes('2 x') ? 'border-blue-600 bg-white' : 'border-gray-200 bg-white'} text-sm`}
                  >
                    2 x ({data.unit || 'unit'})
                  </button>
                </div>
              </div>

              {/* Price Section */}
              <div className='mt-4'>
                <p className='font-medium text-sm'>Price</p>
                <div className='flex items-center gap-3 mt-2'>
                  <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
                    <p className='font-semibold text-lg lg:text-xl'>{displayPrice}</p>
                  </div>
                  {data.discount > 0 && (
                    <p className='line-through text-sm text-neutral-500'>{DisplayPriceInRupees(totalOriginal)}</p>
                  )}
                  {data.discount > 0 && (
                    <p className="font-bold text-green-600 lg:text-lg">
                      {data.discount}% <span className='text-base text-neutral-500 font-normal'>OFF</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              {data.stock === 0 ? (
                <p className='text-lg text-red-500 my-4'>Out of Stock</p>
              ) : (
                <div className='my-4'>
                  <AddToCartButton data={data} />
                </div>
              )}

              <h2 className='font-semibold mt-4 mb-2'>Why shop from binkeyit?</h2>
              <div>
                <div className='flex items-center gap-4 my-3'>
                  <img src={image1} alt='superfast delivery' className='w-16 h-16' />
                  <div className='text-sm'>
                    <div className='font-semibold'>Superfast Delivery</div>
                    <p className='text-neutral-600 text-sm'>Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
                  </div>
                </div>
                <div className='flex items-center gap-4 my-3'>
                  <img src={image2} alt='Best prices offers' className='w-16 h-16' />
                  <div className='text-sm'>
                    <div className='font-semibold'>Best Prices & Offers</div>
                    <p className='text-neutral-600 text-sm'>Best price destination with offers directly from the manufacturers.</p>
                  </div>
                </div>
                <div className='flex items-center gap-4 my-3'>
                  <img src={image3} alt='Wide Assortment' className='w-16 h-16' />
                  <div className='text-sm'>
                    <div className='font-semibold'>Wide Assortment</div>
                    <p className='text-neutral-600 text-sm'>Choose from 5000+ products across food, personal care, household & other categories.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="w-full bg-white py-8">
        {relatedProducts.length > 0 && (
          <div className="container mx-auto">
            <div className="mb-6 px-4">
              <h2 className="text-2xl font-bold" style={{ marginLeft: '50px' }}>More from {currentCategory}</h2>
            </div>
            <div className="px-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {relatedProducts
                  .filter(p => String(p._id) !== String(productId)) // Exclude current product
                  .slice(0, 5)
                  .map((p, idx) => (
                    <div key={p._id || idx} className="flex justify-center">
                      <div className="w-full max-w-[260px]">
                        <CardProductItem data={p} />
                        {/* category/subcategory labels removed per UX request */}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductDisplayPage
