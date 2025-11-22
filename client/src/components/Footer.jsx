
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaGoogle } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { BiLogoPlayStore, BiLogoApple } from 'react-icons/bi';

const usefulLinks = [
    'About Us', 'Blog', 'Terms', 'Refunds', 'Product Details', 'Privacy', 'FAQs', 'Security', 'Contact',
    'Partner', 'Franchise', 'Seller', 'Warehouse', 'Deliver', 'Resources'
];

const categories = [
    'Vegetables & Fruits', 'Dairy & Breakfast', 'Munchies', 'Tea, Coffee & Health Drinks', 'Atta, Rice & Dal',
    'Cold Drinks & Juices', 'Instant & Frozen Food', 'Tea, Coffee & Health Drinks', 'Chicken, Meat & Fish', 'Baby Care',
    'Bakery & Biscuits', 'Sweet Tooth', 'Sauces & Spreads', 'Organic & Premium', 'Cleaning Essentials',
    'Dry Fruits, Masala & Oil', 'Paan Corner', 'Pharma & Wellness', 'Personal Care', 'Magazines',
    'Electronics & Electricals', 'Toys & Games', 'Rakhi Gifts', 'Kitchen & Dining', 'Stationery Needs'
];

const Footer = () => {
        return (
                <footer className="bg-white border-t mt-12">
                    <div className="max-w-7xl mx-auto px-8 py-10">
                                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-12">
                                    {/* Useful Links - left column */}
                                    <div className="lg:col-span-1">
                                        <h2 className="font-semibold text-xl mb-6 text-gray-900">Useful Links</h2>
                                        <div className="grid grid-cols-1 gap-y-3">
                                            {usefulLinks.map((link, i) => (
                                                link === 'Privacy' ? (
                                                    <Link key={link + i} to="/privacy-policy" className="text-[#767676] text-sm hover:text-[#4e4e4e] transition-colors">{link}</Link>
                                                ) : link === 'About Us' ? (
                                                    <Link key={link + i} to="/about-us" className="text-[#767676] text-sm hover:text-[#4e4e4e] transition-colors">{link}</Link>
                                                ) : link === 'Terms' ? (
                                                    <Link key={link + i} to="/terms" className="text-[#767676] text-sm hover:text-[#4e4e4e] transition-colors">{link}</Link>
                                                ) : link === 'Refunds' ? (
                                                    <Link key={link + i} to="/refund-cancellation" className="text-[#767676] text-sm hover:text-[#4e4e4e] transition-colors">{link}</Link>
                                                ) : link === 'Product Details' ? (
                                                    <Link key={link + i} to="/product-pricing" className="text-[#767676] text-sm hover:text-[#4e4e4e] transition-colors">{link}</Link>
                                                ) : link === 'Deliver' ? (
                                                    <Link key={link + i} to="/delivery-shipping" className="text-[#767676] text-sm hover:text-[#4e4e4e] transition-colors">{link}</Link>
                                                ) : link === 'Contact' ? (
                                                    <Link key={link + i} to="/contact" className="text-[#767676] text-sm hover:text-[#4e4e4e] transition-colors">{link}</Link>
                                                ) : link === 'FAQs' ? (
                                                    <Link key={link + i} to="/faqs" className="text-[#767676] text-sm hover:text-[#4e4e4e] transition-colors">{link}</Link>
                                                ) : link === 'Blog' ? (
                                                    <Link key={link + i} to="/blog" className="text-[#767676] text-sm hover:text-[#4e4e4e] transition-colors">{link}</Link>
                                                ) : (
                                                    <a key={link + i} href="#" className="text-[#767676] text-sm hover:text-[#4e4e4e] transition-colors">{link}</a>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                    {/* Categories - take most of horizontal space and show 5 columns visually by using nested grids */}
                                    <div className="lg:col-span-5">
                                        <div className="flex items-center mb-6">
                                            <h2 className="font-semibold text-xl text-gray-900 mr-3">Categories</h2>
                                            <a href="#" className="text-[#00a550] text-sm capitalize font-semibold hover:text-[#777777] hover:underline transition-colors">See all</a>
                                        </div>
                                        <div className="grid grid-cols-5 gap-x-8 gap-y-2 text-sm text-[#767676]">
                                            {categories.map((cat, i) => (
                                                <a key={cat + i} href="#" className="hover:text-[#4e4e4e] transition-colors">{cat}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                        {/* Copyright, App Download, Social Icons */}
                                <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-6 text-base text-gray-700">
                                    <div className="flex flex-col text-sm text-[#767676]">
                                            <span className="text-center md:text-left text-sm font-normal text-[#767676]">© Bigebucket Commerce Private Limited, 2016-2025</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-base">Download App</span>
                                    <div className="flex gap-2">
                                        <a href="#" className="flex items-center gap-2 px-2 py-1 bg-black text-white rounded-lg text-xs font-semibold hover:bg-gray-800">
                                            <BiLogoApple className="text-xl" /> App Store
                                        </a>
                                        <a href="#" className="flex items-center gap-2 px-2 py-1 bg-black text-white rounded-lg text-xs font-semibold hover:bg-gray-800">
                                            <BiLogoPlayStore className="text-xl" /> Google Play
                                        </a>
                                    </div>
                                    </div>
                                    <div className="flex gap-4 text-2xl">
                                        {[FaFacebook, FaXTwitter, FaInstagram, FaLinkedin, FaGoogle].map((Icon, idx) => (
                                            <a key={idx} href="#" className="w-12 h-12 rounded-full border flex items-center justify-center text-black hover:text-green-700 hover:border-green-700 transition-colors">
                                                <Icon />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                    </div>
                </footer>
        );
};

export default Footer;
