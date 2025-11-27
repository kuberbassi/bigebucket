// Default settings configuration for the e-commerce platform
export const defaultSettings = [
    // ========== DISPLAY SETTINGS ==========
    {
        key: 'catalog.productsPerRow.desktop',
        value: 6,
        category: 'display',
        type: 'number',
        label: 'Products Per Row (Desktop)',
        description: 'Number of products to show per row on desktop screens',
        default: 6,
        validation: { min: 2, max: 8, required: true }
    },
    {
        key: 'catalog.productsPerRow.tablet',
        value: 4,
        category: 'display',
        type: 'number',
        label: 'Products Per Row (Tablet)',
        description: 'Number of products to show per row on tablet screens',
        default: 4,
        validation: { min: 2, max: 6, required: true }
    },
    {
        key: 'catalog.productsPerRow.mobile',
        value: 2,
        category: 'display',
        type: 'number',
        label: 'Products Per Row (Mobile)',
        description: 'Number of products to show per row on mobile screens',
        default: 2,
        validation: { min: 1, max: 3, required: true }
    },
    {
        key: 'catalog.productsPerPage',
        value: 12,
        category: 'display',
        type: 'select',
        label: 'Products Per Page',
        description: 'Number of products to show per page',
        options: [
            { label: '12 products', value: 12 },
            { label: '24 products', value: 24 },
            { label: '36 products', value: 36 },
            { label: '48 products', value: 48 }
        ],
        default: 12,
        validation: { required: true }
    },
    {
        key: 'catalog.defaultView',
        value: 'grid',
        category: 'display',
        type: 'select',
        label: 'Default View',
        description: 'Default product listing view',
        options: [
            { label: 'Grid View', value: 'grid' },
            { label: 'List View', value: 'list' }
        ],
        default: 'grid',
        validation: { required: true }
    },
    {
        key: 'catalog.showQuickView',
        value: true,
        category: 'display',
        type: 'boolean',
        label: 'Show Quick View',
        description: 'Enable quick view button on product cards',
        default: true
    },
    {
        key: 'catalog.imageAspectRatio',
        value: '1:1',
        category: 'display',
        type: 'select',
        label: 'Product Image Aspect Ratio',
        description: 'Aspect ratio for product images',
        options: [
            { label: 'Square (1:1)', value: '1:1' },
            { label: 'Portrait (3:4)', value: '3:4' },
            { label: 'Landscape (4:3)', value: '4:3' }
        ],
        default: '1:1'
    },

    // ========== THEME SETTINGS ==========
    {
        key: 'theme.primaryColor',
        value: '#16a34a',
        category: 'theme',
        type: 'color',
        label: 'Primary Color',
        description: 'Main brand color used throughout the site',
        default: '#16a34a',
        validation: { required: true }
    },
    {
        key: 'theme.secondaryColor',
        value: '#0ea5e9',
        category: 'theme',
        type: 'color',
        label: 'Secondary Color',
        description: 'Secondary accent color',
        default: '#0ea5e9',
        validation: { required: true }
    },
    {
        key: 'theme.backgroundColor',
        value: '#ffffff',
        category: 'theme',
        type: 'color',
        label: 'Background Color',
        description: 'Main background color',
        default: '#ffffff',
        validation: { required: true }
    },
    {
        key: 'theme.textColor',
        value: '#1f2937',
        category: 'theme',
        type: 'color',
        label: 'Text Color',
        description: 'Primary text color',
        default: '#1f2937',
        validation: { required: true }
    },
    {
        key: 'theme.fontFamily.heading',
        value: 'Inter',
        category: 'theme',
        type: 'select',
        label: 'Heading Font',
        description: 'Font family for headings',
        options: [
            { label: 'Inter', value: 'Inter' },
            { label: 'Roboto', value: 'Roboto' },
            { label: 'Poppins', value: 'Poppins' },
            { label: 'Montserrat', value: 'Montserrat' },
            { label: 'Open Sans', value: 'Open Sans' }
        ],
        default: 'Inter'
    },
    {
        key: 'theme.fontFamily.body',
        value: 'Inter',
        category: 'theme',
        type: 'select',
        label: 'Body Font',
        description: 'Font family for body text',
        options: [
            { label: 'Inter', value: 'Inter' },
            { label: 'Roboto', value: 'Roboto' },
            { label: 'Poppins', value: 'Poppins' },
            { label: 'Montserrat', value: 'Montserrat' },
            { label: 'Open Sans', value: 'Open Sans' }
        ],
        default: 'Inter'
    },
    {
        key: 'theme.borderRadius',
        value: '0.5rem',
        category: 'theme',
        type: 'select',
        label: 'Border Radius',
        description: 'Border radius for buttons and cards',
        options: [
            { label: 'None', value: '0' },
            { label: 'Small (0.25rem)', value: '0.25rem' },
            { label: 'Medium (0.5rem)', value: '0.5rem' },
            { label: 'Large (1rem)', value: '1rem' },
            { label: 'Extra Large (1.5rem)', value: '1.5rem' }
        ],
        default: '0.5rem'
    },

    // ========== BUSINESS SETTINGS ==========
    {
        key: 'business.storeName',
        value: 'Bigebucket',
        category: 'business',
        type: 'text',
        label: 'Store Name',
        description: 'Your store name',
        default: 'Bigebucket',
        validation: { required: true }
    },
    {
        key: 'business.storeDescription',
        value: 'Your one-stop shop for quality products',
        category: 'business',
        type: 'textarea',
        label: 'Store Description',
        description: 'Brief description of your store',
        default: 'Your one-stop shop for quality products'
    },
    {
        key: 'business.contactEmail',
        value: 'contact@bigebucket.com',
        category: 'business',
        type: 'text',
        label: 'Contact Email',
        description: 'Customer support email address',
        default: 'contact@bigebucket.com',
        validation: { required: true, pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' }
    },
    {
        key: 'business.contactPhone',
        value: '+1234567890',
        category: 'business',
        type: 'text',
        label: 'Contact Phone',
        description: 'Customer support phone number',
        default: '+1234567890'
    },
    {
        key: 'business.address',
        value: '123 Main Street, City, Country',
        category: 'business',
        type: 'textarea',
        label: 'Store Address',
        description: 'Physical store address',
        default: '123 Main Street, City, Country'
    },
    {
        key: 'business.currency',
        value: 'INR',
        category: 'business',
        type: 'select',
        label: 'Currency',
        description: 'Default currency for prices',
        options: [
            { label: 'Indian Rupee (₹)', value: 'INR' },
            { label: 'US Dollar ($)', value: 'USD' },
            { label: 'Euro (€)', value: 'EUR' },
            { label: 'British Pound (£)', value: 'GBP' }
        ],
        default: 'INR',
        validation: { required: true }
    },
    {
        key: 'business.currencySymbol',
        value: '₹',
        category: 'business',
        type: 'text',
        label: 'Currency Symbol',
        description: 'Symbol to display for currency',
        default: '₹',
        validation: { required: true }
    },

    // ========== HOMEPAGE SETTINGS ==========
    {
        key: 'homepage.heroBanner.enabled',
        value: true,
        category: 'homepage',
        type: 'boolean',
        label: 'Enable Hero Banner',
        description: 'Show hero banner on homepage',
        default: true
    },
    {
        key: 'homepage.featuredProducts.count',
        value: 8,
        category: 'homepage',
        type: 'number',
        label: 'Featured Products Count',
        description: 'Number of featured products to show',
        default: 8,
        validation: { min: 4, max: 20 }
    },
    {
        key: 'homepage.categories.show',
        value: true,
        category: 'homepage',
        type: 'boolean',
        label: 'Show Categories Section',
        description: 'Display categories on homepage',
        default: true
    },
    {
        key: 'homepage.categories.count',
        value: 8,
        category: 'homepage',
        type: 'number',
        label: 'Categories to Display',
        description: 'Number of categories to show on homepage',
        default: 8,
        validation: { min: 4, max: 16 }
    },

    // ========== PRODUCT DISPLAY SETTINGS ==========
    {
        key: 'product.showPrice',
        value: true,
        category: 'product',
        type: 'boolean',
        label: 'Show Price',
        description: 'Display product prices',
        default: true
    },
    {
        key: 'product.showDiscount',
        value: true,
        category: 'product',
        type: 'boolean',
        label: 'Show Discount Badge',
        description: 'Display discount percentage on products',
        default: true
    },
    {
        key: 'product.showStock',
        value: true,
        category: 'product',
        type: 'boolean',
        label: 'Show Stock Status',
        description: 'Display in-stock/out-of-stock status',
        default: true
    },
    {
        key: 'product.showAddToCart',
        value: true,
        category: 'product',
        type: 'boolean',
        label: 'Show Add to Cart Button',
        description: 'Display add to cart button on product cards',
        default: true
    },
    {
        key: 'product.relatedProductsCount',
        value: 4,
        category: 'product',
        type: 'number',
        label: 'Related Products Count',
        description: 'Number of related products to show',
        default: 4,
        validation: { min: 2, max: 12 }
    },

    // ========== HEADER SETTINGS ==========
    {
        key: 'header.showSearch',
        value: true,
        category: 'header',
        type: 'boolean',
        label: 'Show Search Bar',
        description: 'Display search bar in header',
        default: true
    },
    {
        key: 'header.showCart',
        value: true,
        category: 'header',
        type: 'boolean',
        label: 'Show Cart Icon',
        description: 'Display cart icon in header',
        default: true
    },
    {
        key: 'header.stickyHeader',
        value: true,
        category: 'header',
        type: 'boolean',
        label: 'Sticky Header',
        description: 'Keep header fixed at top when scrolling',
        default: true
    },

    // ========== FOOTER SETTINGS ==========
    {
        key: 'footer.copyrightText',
        value: '© 2024 Bigebucket. All rights reserved.',
        category: 'footer',
        type: 'text',
        label: 'Copyright Text',
        description: 'Copyright notice in footer',
        default: '© 2024 Bigebucket. All rights reserved.'
    },
    {
        key: 'footer.showSocialMedia',
        value: true,
        category: 'footer',
        type: 'boolean',
        label: 'Show Social Media Links',
        description: 'Display social media icons in footer',
        default: true
    }
];
