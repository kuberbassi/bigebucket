import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import CategoryProducts from "../components/CategoryProducts";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Terms from "../pages/Terms";
import DeliveryShipping from "../pages/DeliveryShipping";
import RefundCancellation from "../pages/RefundCancellation";
import ProductPricing from "../pages/ProductPricing";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import FAQs from "../pages/FAQs";
import BlogList from "../pages/BlogList";
import BlogCreate from "../pages/BlogCreate";
import BlogEdit from "../pages/BlogEdit";
import BlogView from "../pages/BlogView";
import AdminPendingPosts from "../pages/AdminPendingPosts";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermision from "../layouts/AdminPermision";
import AdminPanel from "../pages/AdminPanel";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../pages/CartMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path: "blog",
                element: <BlogList />
            },
            {
                path: "blog/create",
                element: <BlogCreate />
            },
            {
                path: "blog/:id",
                element: <BlogView />
            },
            {
                path: "blog/:id/edit",
                element: <BlogEdit />
            },
            {
                path : "",
                element : <Home/>
            },
            {
                path : "search",
                element : <SearchPage/>
            },
            {
                path: "privacy-policy",
                element: <PrivacyPolicy />
            },
            {
                path: "terms",
                element: <Terms />
            },
            {
                path: "delivery-shipping",
                element: <DeliveryShipping />
            },
            {
                path: "refund-cancellation",
                element: <RefundCancellation />
            },
            {
                path: "product-pricing",
                element: <ProductPricing />
            },
            {
                path: "about-us",
                element: <AboutUs />
            },
            {
                path: "faqs",
                element: <FAQs />
            },
            {
                path: "contact",
                element: <ContactUs />
            },
            {
                path : 'login',
                element : <Login/>
            },
            {
                path : "register",
                element : <Register/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "verification-otp",
                element : <OtpVerification/>
            },
            {
                path : "reset-password",
                element : <ResetPassword/>
            },
            {
                path : "user",
                element : <UserMenuMobile/>
            },
            {
                path : "dashboard",
                element : <Dashboard/>,
                children : [
                    {
                        path : "profile",
                        element : <Profile/>
                    },
                    {
                        path : "myorders",
                        element : <MyOrders/>
                    },
                    {
                        path : "address",
                        element : <Address/>
                    },
                    {
                        path : 'category',
                        element : <AdminPermision><CategoryPage/></AdminPermision>
                    },
                    {
                        path : "subcategory",
                        element : <AdminPermision><SubCategoryPage/></AdminPermision>
                    },
                    {
                        path : 'upload-product',
                        element : <AdminPermision><UploadProduct/></AdminPermision>
                    },
                    {
                        path : 'product',
                        element : <AdminPermision><ProductAdmin/></AdminPermision>
                    },
                    {
                        path : 'admin-panel',
                        element : <AdminPermision><AdminPanel/></AdminPermision>
                    }
                ]
            },
            {
                path: 'pending-posts',
                element: <AdminPermision><AdminPendingPosts/></AdminPermision>
            },
            {
                path: "category/:categoryName",
                element: <CategoryProducts />
            },
            {
                path : ":category",
                children : [
                    {
                        path : ":subCategory",
                        element : <ProductListPage/>
                    }
                ]
            },
            {
                path : "product/:product",
                element : <ProductDisplayPage/>
            },
            {
                path : 'cart',
                element : <CartMobile/>
            },
            {
                path : "checkout",
                element : <CheckoutPage/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : 'cancel',
                element : <Cancel/>
            }
        ]
    }
])

export default router