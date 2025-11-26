import React, { useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import resizeImageFile from '../utils/imageResize'

const AdminPanel = () => {
    const [productData, setProductData] = useState({
        name: "",
        image: [],
        category: "",
        categoryImage: [],
        subCategory: "",
        subCategoryImage: [],
        unit: "",
        stock: "",
        price: "",
        discount: "",
        description: "",
        pricePerKilo: "",
        deliveryTime: "",
        more_details: {},
        publish: true
    });
    const [imageFiles, setImageFiles] = useState({
        product: [],
        category: null,
        subCategory: null
    });
    const [imageUrlInputs, setImageUrlInputs] = useState({
        product: '',
        category: '',
        subCategory: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (type) => (e) => {
        if (type === 'product') {
            // multiple files
            const files = Array.from(e.target.files || []);
            setImageFiles(prev => ({
                ...prev,
                product: files
            }));
            // clear product URL input when files provided
            setImageUrlInputs(prev => ({ ...prev, product: '' }));
        } else {
            setImageFiles(prev => ({
                ...prev,
                [type]: e.target.files[0]
            }));
            // if user selected a file, clear corresponding URL input
            setImageUrlInputs(prev => ({
                ...prev,
                [type]: ''
            }));
        }
    }

    const handleImageUrlChange = (type) => (e) => {
        const v = e.target.value;
        setImageUrlInputs(prev => ({
            ...prev,
            [type]: v
        }));
        // if user typed a URL, clear corresponding file input (for product, clear array)
        if (type === 'product' && imageFiles.product && imageFiles.product.length > 0) {
            setImageFiles(prev => ({ ...prev, product: [] }));
        } else if (imageFiles[type]) {
            setImageFiles(prev => ({ ...prev, [type]: null }));
        }
    }

  const navigate = useNavigate()

  // Upload a single file or return urlInput; used for category/subcategory single images
  const uploadImage = async (file, urlInput) => {
        if (urlInput && urlInput.trim().length > 0) {
            return urlInput.trim();
        } else if (file) {
            // Resize category/subcategory single image to recommended size before upload
            let targetW = 270, targetH = 396;
            // if file came from subCategory input, use subcategory dimensions (we'll detect by id or pass explicit args when calling)
            // Here we attempt to detect by name property if present (AdminPanel passes correct files separately)
            // Default above matches Category size. Caller will pass correct dimensions for subcategory when needed.
            try {
                const resized = await resizeImageFile(file, targetW, targetH, 'image/jpeg', 0.8);
                file = resized || file;
            } catch (e) {
                // If resizing fails, fall back to original file
                console.warn('Image resize failed, uploading original file', e);
            }
            const formData = new FormData();
            formData.append('image', file);
            const uploadResponse = await Axios.post(SummaryApi.uploadImage.url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(uploadResponse.data && uploadResponse.data.success){
                return uploadResponse.data.data.url;
            }
        }
        return '';
    }

  // Upload multiple product files and/or parse multiple URLs (comma or newline separated)
    const uploadMultipleProductImages = async (files = [], urlInput = '') => {
        const results = [];

        // First, if urlInput provided, parse into entries (support comma or newline separated list)
        if (urlInput && urlInput.trim().length > 0) {
            const parts = urlInput.split(/[,\n]+/).map(s => s.trim()).filter(Boolean);
            results.push(...parts);
        }

        // Then upload files (if any)
        if (files && files.length > 0) {
            // upload in parallel
            // Resize product images to 360x360 before uploading
            const resizePromises = files.map(f => resizeImageFile(f, 360, 360, 'image/jpeg', 0.85).catch(() => f));
            const resizedFiles = await Promise.all(resizePromises);

            const uploads = resizedFiles.map(file => {
                const fd = new FormData();
                fd.append('image', file);
                return Axios.post(SummaryApi.uploadImage.url, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            });
            try {
                const responses = await Promise.all(uploads);
                responses.forEach(r => {
                    if (r.data && r.data.success && r.data.data && r.data.data.url) results.push(r.data.data.url);
                });
            } catch (err) {
                console.error('Error uploading product images:', err);
            }
        }

        return results;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Upload images. Product can be multiple images (array of URLs returned)
            const [productImageUrlsArray, categoryImageUrl, subCategoryImageUrl] = await Promise.all([
                uploadMultipleProductImages(imageFiles.product, imageUrlInputs.product),
                uploadImage(imageFiles.category, imageUrlInputs.category),
                uploadImage(imageFiles.subCategory, imageUrlInputs.subCategory)
            ]);

            // Ensure we have a category id. First try to find existing category by name.
            let categoryId = null
            if (productData.category) {
                // normalize category name if user or previous logic accidentally set it as array/object
                const categoryName = Array.isArray(productData.category)
                    ? (productData.category[0]?.name || productData.category[0])
                    : productData.category
                // fetch categories and try to match name (server provides /api/category/get)
                const allCatResp = await Axios({ ...SummaryApi.getCategory })
                if (allCatResp.data && allCatResp.data.success) {
                    const found = allCatResp.data.data.find(c => c.name.toLowerCase() === productData.category.toLowerCase())
                    if (found) categoryId = found._id
                }

                // if not found, create new category (with or without image)
                if (!categoryId) {
                    const createCatResp = await Axios({
                        ...SummaryApi.addCategory,
                        data: {
                            name: categoryName,
                            image: categoryImageUrl ? [categoryImageUrl] : []
                        }
                    })
                    if (createCatResp.data && createCatResp.data.success) {
                        categoryId = createCatResp.data.data._id
                    }
                } else if (categoryImageUrl) {
                    // if category exists but we have a new image, update it
                    await Axios({
                        ...SummaryApi.updateCategory,
                        data: {
                            _id: categoryId,
                            name: categoryName,
                            image: [categoryImageUrl]
                        }
                    })
                }
            }

            // Ensure we have subCategory id. Try to find existing subcategory by name + category
            let subCategoryId = null
            if (productData.subCategory) {
                const subCategoryName = Array.isArray(productData.subCategory)
                    ? (productData.subCategory[0]?.name || productData.subCategory[0])
                    : productData.subCategory
                // fetch all subcategories
                const allSubResp = await Axios({ ...SummaryApi.getSubCategory })
                if (allSubResp.data && allSubResp.data.success) {
                    const foundSub = allSubResp.data.data.find(s => s.name.toLowerCase() === subCategoryName.toLowerCase() && ((s.category && s.category[0] && s.category[0]._id) === categoryId))
                    if (foundSub) subCategoryId = foundSub._id
                }

                if (!subCategoryId) {
                    const createSubResp = await Axios({
                        ...SummaryApi.createSubCategory,
                        data: {
                            name: subCategoryName,
                            image: subCategoryImageUrl ? [subCategoryImageUrl] : [],
                            category: [categoryId]
                        }
                    })
                    if (createSubResp.data && createSubResp.data.success) {
                        subCategoryId = createSubResp.data.data._id
                    }
                } else if (subCategoryImageUrl) {
                    // update existing subcategory image
                    await Axios({
                        ...SummaryApi.updateSubCategory,
                        data: {
                            _id: subCategoryId,
                            name: productData.subCategory,
                            image: subCategoryImageUrl ? [subCategoryImageUrl] : [],
                            category: [categoryId]
                        }
                    })
                }
            }

            const dataToSubmit = {
                ...productData,
                category: categoryId ? [categoryId] : [],
                subCategory: subCategoryId ? [subCategoryId] : [],
                image: Array.isArray(productImageUrlsArray) ? productImageUrlsArray : (productImageUrlsArray ? [productImageUrlsArray] : []),
            };

            const response = await Axios({
                ...SummaryApi.createProduct,
                data: dataToSubmit
            });

      if (response.data.success) {
        toast.success("Product added successfully!");
                setProductData({
                    name: "",
                    image: [],
                    category: "",
                    categoryImage: [],
                    subCategory: "",
                    subCategoryImage: [],
                    unit: "",
                    stock: "",
                    price: "",
                    discount: "",
                    description: "",
                    pricePerKilo: "",
                    deliveryTime: "",
                    more_details: {},
                    publish: true
                });
                setImageFiles({
                    product: [],
                    category: null,
                    subCategory: null
                });
                setImageUrlInputs({
                    product: '',
                    category: '',
                    subCategory: ''
                });
        // redirect to category/subcategory product list
        const saved = response.data.data
        const category = saved.category && saved.category[0]
        const sub = saved.subCategory && saved.subCategory[0]

        if(category && sub){
          const link = `/${valideURLConvert(category.name)}-${category._id}/${valideURLConvert(sub.name)}-${sub._id}`
          navigate(link)
        }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input type="text" name="name" id="name" value={productData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input type="text" name="category" id="category" value={productData.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">Subcategory</label>
              <input type="text" name="subCategory" id="subCategory" value={productData.subCategory} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input type="number" name="price" id="price" value={productData.price} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Quantity (e.g., 1kg, 500g)</label>
              <input type="text" name="unit" id="unit" value={productData.unit} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="pricePerKilo" className="block text-sm font-medium text-gray-700">Price per kg/litre</label>
              <input type="text" name="pricePerKilo" id="pricePerKilo" value={productData.pricePerKilo} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Offer (e.g., 10% off)</label>
              <input type="text" name="discount" id="discount" value={productData.discount} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">Delivery Time</label>
              <input type="text" name="deliveryTime" id="deliveryTime" value={productData.deliveryTime} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" id="description" rows="3" value={productData.description} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            {/* Product Image */}
            <div className="md:col-span-2">
                <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Product Images</label>
                <input 
                    type="file" 
                    name="productImage" 
                    id="productImage" 
                    multiple
                    onChange={handleImageChange('product')} 
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
                {imageFiles.product && imageFiles.product.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                        Selected files: {imageFiles.product.map((f, i) => <span key={i} className="inline-block mr-2">{f.name}</span>)}
                    </div>
                )}
                <div className="mt-3">
                    <label htmlFor="productImageUrl" className="block text-sm font-medium text-gray-700">Or paste Product Image URLs (comma or newline separated)</label>
                    <textarea
                        name="productImageUrl"
                        id="productImageUrl"
                        placeholder="https://... , https://... or /public/image1.png\n/public/image2.png"
                        value={imageUrlInputs.product}
                        onChange={handleImageUrlChange('product')}
                        rows={3}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>

            {/* Category Image */}
            <div className="md:col-span-2">
                <label htmlFor="categoryImage" className="block text-sm font-medium text-gray-700">Category Image</label>
                <input 
                    type="file" 
                    name="categoryImage" 
                    id="categoryImage" 
                    onChange={handleImageChange('category')} 
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
                <div className="mt-3">
                    <label htmlFor="categoryImageUrl" className="block text-sm font-medium text-gray-700">Or paste Category Image URL</label>
                    <input 
                        type="text" 
                        name="categoryImageUrl" 
                        id="categoryImageUrl" 
                        placeholder="https://... or /public/image.png" 
                        value={imageUrlInputs.category} 
                        onChange={handleImageUrlChange('category')} 
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    />
                </div>
            </div>

            {/* Subcategory Image */}
            <div className="md:col-span-2">
                <label htmlFor="subCategoryImage" className="block text-sm font-medium text-gray-700">Subcategory Image</label>
                <input 
                    type="file" 
                    name="subCategoryImage" 
                    id="subCategoryImage" 
                    onChange={handleImageChange('subCategory')} 
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
                <div className="mt-3">
                    <label htmlFor="subCategoryImageUrl" className="block text-sm font-medium text-gray-700">Or paste Subcategory Image URL</label>
                    <input 
                        type="text" 
                        name="subCategoryImageUrl" 
                        id="subCategoryImageUrl" 
                        placeholder="https://... or /public/image.png" 
                        value={imageUrlInputs.subCategory} 
                        onChange={handleImageUrlChange('subCategory')} 
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    />
                </div>
            </div>
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
