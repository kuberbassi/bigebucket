import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CardProductItem from '../components/CardProduct';
import banner1 from '../assets/banner_new_1.png';
import banner2 from '../assets/banner_new_2.png';
import { useSelector, useDispatch } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { Link, useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import { normalizeImageArray } from '../utils/normalizeImageUrl'
import CategoryProductGrid from '../components/CategoryProductGrid';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { setAllCategory, setLoadingCategory } from '../store/productSlice';

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory) || [];
  const subCategoryData = useSelector((state) => state.product.allSubCategory) || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // include both desktop and mobile banner images as separate slides
  const banners = [
    { desktop: banner1, mobile: banner1 },
    { desktop: banner2, mobile: banner2 },
  ];
  const [bannerIndex, setBannerIndex] = useState(0);
  // advance to next banner (used by auto-advance)
  const handleBannerNext = () => setBannerIndex((prev) => (prev + 1) % banners.length);

  // Auto-advance the banner every 4 seconds. If there's only one banner this is a no-op.
  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const id = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(id);
    // only depend on number of banners
  }, [banners.length]);

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) => Array.isArray(sub.category) && sub.category.some((c) => getId(c) === getId(id)));
    if (subcategory) {
      const url = `/${valideURLConvert(cat)}-${getId(id)}/${valideURLConvert(subcategory.name)}-${getId(subcategory._id)}`;
      navigate(url);
      console.log('Redirect URL:', url);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [homepageProducts, setHomepageProducts] = useState([]);
  const [fruitsProducts, setFruitsProducts] = useState([]);
  const [modalProducts, setModalProducts] = useState([]);
  const [loadingProductDetails, setLoadingProductDetails] = useState(false);

  // Only use backend categories. Do not fall back to static list to avoid showing static cards on refresh.
  const displayCategories = categoryData || [];

  // Fetch latest categories from backend and update Redux so admin changes are reflected
  const fetchCategories = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const res = await Axios({ ...SummaryApi.getCategory });
      const { data: responseData } = res || {};
      if (responseData?.success && Array.isArray(responseData.data)) {
        dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))));
      }
    } catch (err) {
      AxiosToastError(err);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const findCategoryByName = (catName) => {
    if (!categoryData.length) {
      console.log('No category data available');
      return null;
    }

    const tokensOf = (s) => (s ? s.toString().toLowerCase().split(/[^a-z0-9]+/).filter(Boolean) : []);
    const tokenMatch = (a, b) => {
      const ta = tokensOf(a);
      const tb = tokensOf(b);
      if (ta.length === 0 || tb.length === 0) return false;
      return ta.every((t) => tb.some((bt) => bt.includes(t)));
    };

    // prefer token-based matching (order independent)
    let obj = categoryData.find((c) => tokenMatch(catName, c.name));
    if (obj) return obj;

    // fallback to slug / substring checks
    const normalize = (s) => (s ? s.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-') : '');
    const slug = normalize(catName);
    obj = categoryData.find((c) => normalize(c.name) === slug || normalize(c.name).includes(slug));
    return obj || null;
  };

  // Helper to extract an id string from different shapes returned by backend
  const getId = (v) => {
    if (!v && v !== 0) return null
    if (typeof v === 'string') return v
    if (typeof v === 'number') return String(v)
    if (v._id) return v._id
    if (v.$oid) return v.$oid
    if (v.toString && typeof v.toString === 'function') return v.toString()
    return null
  }

  // Build a 'See All' URL for a given category name or category object
  const buildSeeAllUrl = (cat) => {
    const name = typeof cat === 'string' ? cat : cat?.name;
    let catObj = null;
    if (cat && typeof cat === 'object' && getId(cat._id)) catObj = cat;
    if (!catObj && name) catObj = findCategoryByName(name) || categoryData.find(c => (c.name || '').toLowerCase() === (name || '').toLowerCase());
    const catId = getId(catObj?._id);
    // find a subcategory that belongs to this category. Ensure we always return a URL with a subcategory segment
    let sub = null;
    if (catId && Array.isArray(subCategoryData)) {
      // prefer a subcategory that explicitly references this category
      sub = subCategoryData.find(s => Array.isArray(s.category) ? s.category.some(c => getId(c) === getId(catId)) : getId(s.category) === getId(catId));
      // fallback: choose the first subcategory that has any category reference
      if (!sub) {
        sub = subCategoryData.find(s => Array.isArray(s.category) && s.category.length > 0) || subCategoryData[0] || null;
      }
    }

    const catSlug = catObj ? `${valideURLConvert(catObj.name)}-${getId(catObj._id)}` : `${valideURLConvert(name)}-${getId(catId)}`;

    if (sub) {
      const subSlug = `${valideURLConvert(sub.name)}-${getId(sub._id)}`;
      return `/${catSlug}/${subSlug}`;
    }

    // Last-resort fallback: include a safe sub-segment using the category id so ProductListPage has params to parse
    const safeSub = `${valideURLConvert('all')}-${getId(catId) || getId(catObj?._id) || ''}`;
    return `/${catSlug}/${safeSub}`;
  }

  const fetchProductsByCategory = async (catName) => {
    try {
      setLoadingProductDetails(true);
      const cat = findCategoryByName(catName);
      console.log('Found category for', catName, ':', cat);
      let products = [];
      if (cat) {
        const res = await Axios({ ...SummaryApi.getProductByCategory, data: { id: cat._id } });
        console.log('API response for', catName, ':', res?.data);
        if (res?.data?.success && res.data.data) products = res.data.data;
      }

      if (!products.length) {
        const fallbackRes = await Axios({ ...SummaryApi.getProduct, data: { page: 1, limit: 100 } });
        console.log('Fallback response:', fallbackRes?.data);
        if (fallbackRes?.data?.success && fallbackRes.data.data) {
          const tokensOf = (s) => (s ? s.toString().toLowerCase().split(/[^a-z0-9]+/).filter(Boolean) : []);
          const tokenMatch = (a, b) => {
            const ta = tokensOf(a);
            const tb = tokensOf(b);
            if (ta.length === 0 || tb.length === 0) return false;
            return ta.every((t) => tb.some((bt) => bt.includes(t)));
          };

          products = fallbackRes.data.data.filter((p) =>
            p.category?.some((c) => {
              if (!c) return false;
              if (typeof c === 'string') return tokenMatch(catName || '', c);
              if (c.name) return tokenMatch(catName || '', c.name);
              return false;
            })
          );
        }
      }
      console.log('Final products for', catName, ':', products);
      return products;
    } catch (err) {
      console.error('Error fetching products for', catName, ':', err);
      AxiosToastError(err);
      return [];
    } finally {
      setLoadingProductDetails(false);
    }
  };

  const fetchProductsByCategoryAndSub = async (catId, subId) => {
    try {
      setLoadingProductDetails(true);
      const res = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: { categoryId: catId, subCategoryId: subId, page: 1, limit: 24 },
      });
      console.log('Subcategory API response:', res?.data);
      if (res?.data?.success && res.data.data) return res.data.data;
      return [];
    } catch (err) {
      console.error('Error fetching subcategory products:', err);
      AxiosToastError(err);
      return [];
    } finally {
      setLoadingProductDetails(false);
    }
  };

  // Helper: try to find category by name (from backend list) and fetch its products
  const fetchCategoryProductsDirect = async (catName) => {
    try {
      setLoadingProductDetails(true)
      // try Redux first
      let cat = findCategoryByName(catName)
      if (!cat) {
        // fetch from backend categories endpoint
        const cRes = await Axios({ ...SummaryApi.getCategory })
        if (cRes?.data?.success) {
          const list = cRes.data.data || []
          const tokensOf = (s) => (s ? s.toString().toLowerCase().split(/[^a-z0-9]+/).filter(Boolean) : [])
          const ta = (catName || '').toString().toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
          cat = list.find(c => {
            const tb = tokensOf(c.name)
            return ta.every(t => tb.some(bt => bt.includes(t)))
          })
        }
      }
      if (cat) {
        const pRes = await Axios({ ...SummaryApi.getProductByCategory, data: { id: cat._id } })
        if (pRes?.data?.success) return pRes.data.data || []
      }
    } catch (e) {
      AxiosToastError(e)
    } finally {
      setLoadingProductDetails(false)
    }
    return []
  }

  const loadProducts = async () => {
    // Resolve Dairy category id if present and fetch by id for accuracy
    let dairyProducts = await fetchCategoryProductsDirect('Dairy, Bread & Eggs')
    try {
      if ((!dairyProducts || dairyProducts.length === 0) && categoryData && categoryData.length) {
        const dairyCat = categoryData.find(c => (c.name || '').toLowerCase().includes('dairy'))
        const dairyId = dairyCat ? getId(dairyCat._id) : null
        if (dairyId) {
          const res = await Axios({ ...SummaryApi.getProductByCategory, data: { id: dairyId } })
          if (res?.data?.success) dairyProducts = res.data.data || []
        }
      }
    } catch (e) {
      // ignore and use whatever dairyProducts we have
      console.warn('Error resolving dairy products by id', e)
    }
    console.log('Dairy products loaded:', dairyProducts)
    setHomepageProducts(dairyProducts)

    let fruitsVegProducts = await fetchCategoryProductsDirect('Fruits & Vegetables')
    try {
      if ((!fruitsVegProducts || fruitsVegProducts.length === 0) && categoryData && categoryData.length) {
        const fruitsCat = categoryData.find(c => (c.name || '').toLowerCase().includes('fruit'))
        const fruitsId = fruitsCat ? getId(fruitsCat._id) : null
        if (fruitsId) {
          const res = await Axios({ ...SummaryApi.getProductByCategory, data: { id: fruitsId } })
          if (res?.data?.success) fruitsVegProducts = res.data.data || []
        }
      }
    } catch (e) {
      console.warn('Error resolving fruits products by id', e)
    }
    console.log('Fruits & Veg products loaded:', fruitsVegProducts)
    setFruitsProducts(fruitsVegProducts)
  }

  // Mount: fetch latest categories; set up focus listener + polling. Do not render static categories while loading.
  useEffect(() => {
    fetchCategories()
    const onFocus = () => fetchCategories()
    window.addEventListener('focus', onFocus)
    const intervalId = setInterval(() => fetchCategories(), 20000)
    return () => {
      window.removeEventListener('focus', onFocus)
      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // When backend categories populate, load the homepage product lists
  useEffect(() => {
    if (!categoryData || categoryData.length === 0) return
    loadProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryData])

  const handleCategoryClick = async (cat) => {
    setSelectedCategory(cat.name || (typeof cat === 'string' ? cat : ''));
    setSelectedSubCategory(null);
    setModalOpen(true);
    setLoadingProductDetails(true);

    try {
      // Resolve category id robustly from passed `cat` which may be a backend object or static entry
      let catId = getId(cat._id) || getId(cat);
      if (!catId && cat && cat.name) {
        const found = findCategoryByName(cat.name);
        catId = getId(found?._id);
      }

      // final fallback: try to find by name equality
      if (!catId && categoryData && categoryData.length) {
        const equal = categoryData.find(c => (c.name || '').toLowerCase() === (cat.name || '').toLowerCase());
        catId = getId(equal?._id);
      }

      let products = [];
      if (catId) {
        const res = await Axios({ ...SummaryApi.getProductByCategory, data: { id: catId } });
        if (res?.data?.success) products = res.data.data || [];
      }

      console.log('Fetched products for category id:', catId, products);
      setModalProducts(products);

      // Find subcategories that belong to this category id (normalize category refs)
      const relevantSubs = (subCategoryData || []).filter(sub =>
        Array.isArray(sub.category) && sub.category.some(c => getId(c) === getId(catId))
      );

      if (relevantSubs.length > 0) {
        const firstSub = relevantSubs[0];
        setSelectedSubCategory(firstSub._id);
        // load products scoped to first subcategory for better UX
        const subProducts = await fetchProductsByCategoryAndSub(catId, firstSub._id);
        if (subProducts && subProducts.length) setModalProducts(subProducts);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      AxiosToastError(err);
    } finally {
      setLoadingProductDetails(false);
    }
  };

  const handleSubCategoryClick = async (subCat) => {
    setSelectedSubCategory(subCat._id);
    const catId = getId(subCat.category && Array.isArray(subCat.category) ? subCat.category[0] : subCat.category);
    const products = await fetchProductsByCategoryAndSub(catId, subCat._id);
    console.log('Subcategory products clicked:', products);
    setModalProducts(products);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setModalProducts([]);
    // refresh categories when modal closes in case admin edited something
    fetchCategories()
  };

  return (
    <section className="bg-white min-h-screen pb-12">
      {/* Modern Banner Section */}
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="rounded-2xl overflow-hidden relative shadow-lg group h-48 md:h-72 lg:h-96 w-full">
          <div className="w-full h-full relative bg-gray-100">
            <img
              src={banners[bannerIndex]?.desktop || banner}
              alt="Banner"
              className="w-full h-full object-cover hidden md:block transition-transform duration-700 group-hover:scale-105"
            />
            <img
              src={banners[bannerIndex]?.mobile || bannerMobile}
              alt="Banner Mobile"
              className="w-full h-full object-cover md:hidden transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {/* Slider Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {banners.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 shadow-sm ${bannerIndex === idx ? 'bg-green-500 w-6 md:w-8' : 'bg-white/80 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modern Categories Grid */}
      <div className="container mx-auto px-4 my-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 pl-2 border-l-4 border-green-500">Shop by Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
          {displayCategories && displayCategories.length > 0 ? displayCategories.map((cat, idx) => (
            <div
              key={cat._id || idx}
              className="group flex flex-col items-center cursor-pointer"
              onClick={() => handleCategoryClick(cat)}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-50 p-4 mb-3 group-hover:bg-green-50 transition-all duration-300 shadow-sm group-hover:shadow-lg flex items-center justify-center border border-gray-100 group-hover:border-green-200 group-hover:-translate-y-1">
                <img
                  src={normalizeImageArray(cat.image)[0] || '/placeholder.png'}
                  alt={cat.name}
                  onError={(e) => { e.currentTarget.src = '/placeholder.png'; e.currentTarget.onerror = null }}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-xs md:text-sm font-semibold text-center text-gray-700 group-hover:text-green-700 line-clamp-2 transition-colors">
                {cat.name}
              </span>
            </div>
          )) : (
            <div className="col-span-full text-center py-10 text-gray-400">Loading categories...</div>
          )}
        </div>
      </div>

      {/* Category Wise Product Rows */}
      <div className="space-y-4 md:space-y-8 mb-12">
        {displayCategories.map((cat) => (
          <div key={cat._id} className="">
            <CategoryWiseProductDisplay id={cat._id} name={cat.name} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[85vh] flex flex-col overflow-hidden m-4">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">{selectedCategory ? `${selectedCategory} Products` : 'Available Products'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50">&times;</button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-[140px] border-r border-gray-200 flex flex-col max-h-[70vh] bg-gray-50">
                <div className="flex-1 overflow-y-auto sidebar-scrollbar">
                  <div className="p-2 space-y-2">
                    {(() => {
                      const uniqueSubcategories = subCategoryData || [];

                      let filteredSubs = uniqueSubcategories;
                      try {
                        const selectedCatId = categoryData && categoryData.length ? (categoryData.find(c => c.name && c.name.toLowerCase() === (selectedCategory || '').toLowerCase())?._id || null) : null;
                        if (selectedCatId) {
                          filteredSubs = uniqueSubcategories.filter(sub =>
                            Array.isArray(sub.category) ? sub.category.some(c => getId(c) === getId(selectedCatId)) : getId(sub.category) === getId(selectedCatId)
                          );
                        }
                      } catch (e) { }

                      return filteredSubs.length > 0 ? (
                        filteredSubs.map((sub) => (
                          <button
                            key={getId(sub._id) || getId(sub)}
                            className={`w-full relative flex flex-col items-center p-2 rounded-lg transition-all duration-200 border ${selectedSubCategory === sub._id
                              ? 'bg-white border-green-500 shadow-md scale-105 z-10'
                              : 'bg-white border-transparent hover:bg-white hover:shadow-sm'
                              }`}
                            onClick={async () => {
                              if (selectedSubCategory === sub._id) {
                                setSelectedSubCategory(null);
                                const products = await fetchProductsByCategory(selectedCategory);
                                setModalProducts(products);
                              } else {
                                handleSubCategoryClick(sub);
                              }
                            }}
                          >
                            <div className="w-12 h-12 rounded-md overflow-hidden bg-white flex items-center justify-center mb-1">
                              <img
                                src={normalizeImageArray(sub.image)[0] || '/placeholder.png'}
                                onError={(e) => { e.currentTarget.src = '/placeholder.png'; e.currentTarget.onerror = null }}
                                alt={sub.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span className={`text-[10px] leading-tight text-center line-clamp-2 ${selectedSubCategory === sub._id ? 'font-bold text-green-700' : 'text-gray-600'
                              }`}>
                              {(sub.name || '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="text-center text-xs text-gray-400 py-4">No subcategories</div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50">
                {loadingProductDetails ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array(8).fill(null).map((_, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 h-64 animate-pulse">
                        <div className="bg-gray-200 rounded-md h-32 mb-4"></div>
                        <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                        <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {modalProducts.length > 0 ? (
                      (() => {
                        const filteredProducts = modalProducts;

                        return filteredProducts.length > 0 ? (
                          filteredProducts.map((product, idx) => (
                            <CardProductItem key={product._id || idx} data={product} />
                          ))
                        ) : (
                          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
                            <span className="text-4xl mb-2">📦</span>
                            <p>No products found in this selection.</p>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
                        <span className="text-4xl mb-2">🔍</span>
                        <p>No products available.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;