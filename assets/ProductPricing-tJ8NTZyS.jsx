import React from 'react';

const ProductPricing = () => {
    return (
        <div className="min-h-screen bg-gray-50 w-full">
            <main className="w-full px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-black tracking-tight flex items-center justify-center">
                         Service Details &amp; Pricing Structure
                    </h1>
                    <hr className="my-6" />

                    <article className="mt-6 text-left leading-relaxed">
                        <p className="mb-4 text-sm text-gray-600">Last Updated: November 2025</p>

                        <p className="mb-4 policy-paragraph">Welcome to <strong>BigeBucket</strong>, operated by <strong>Indiaonroaming Pvt. Ltd.</strong> — we’re proud to offer a wide range of everyday essentials, groceries, and lifestyle products delivered fast, fresh, and fairly priced. This page explains product categories, our pricing model, and transparency commitments for customers using <a href="https://bigebucket.com" className="policy-link">https://bigebucket.com</a> or our app.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">1. Product Categories</h2>
                        <p className="mb-4 policy-paragraph">We connect customers with trusted local stores. Our catalog includes thousands of daily-use products across categories such as:</p>
                        <ul className="list-none pl-0 mb-4">
                            <li className="flex items-start gap-3 mb-2"><span className="text-2xl">🥬</span><span className="policy-paragraph">Groceries &amp; Staples — Rice, pulses, atta, oil, and spices</span></li>
                            <li className="flex items-start gap-3 mb-2"><span className="text-2xl">🥛</span><span className="policy-paragraph">Dairy &amp; Bakery — Milk, bread, butter, eggs, and snacks</span></li>
                            <li className="flex items-start gap-3 mb-2"><span className="text-2xl">🍎</span><span className="policy-paragraph">Fruits &amp; Vegetables — Fresh and locally sourced produce</span></li>
                            <li className="flex items-start gap-3 mb-2"><span className="text-2xl">🧴</span><span className="policy-paragraph">Personal Care — Skincare, haircare, and hygiene</span></li>
                            <li className="flex items-start gap-3 mb-2"><span className="text-2xl">🧹</span><span className="policy-paragraph">Home Care — Cleaning and household essentials</span></li>
                            <li className="flex items-start gap-3 mb-2"><span className="text-2xl">🍫</span><span className="policy-paragraph">Snacks &amp; Beverages — Chips, cold drinks, juices, and munchies</span></li>
                            <li className="flex items-start gap-3 mb-2"><span className="text-2xl">🩺</span><span className="policy-paragraph">Health &amp; Wellness — Vitamins, hygiene, and care products</span></li>
                        </ul>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">2. Pricing Structure</h2>
                        <p className="mb-4 policy-paragraph">Our pricing is transparent, competitive, and location-based. Prices are listed in Indian Rupees (INR) and include applicable taxes. Final payable price is displayed at checkout (no hidden charges). Delivery fees, if any, are shown before payment.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">3. Offers, Discounts &amp; Promotions</h2>
                        <p className="mb-4 policy-paragraph">We may provide promo codes, cashback, loyalty points, and free-delivery offers subject to terms and validity. Offer details and conditions appear in-app.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">4. Dynamic Pricing Model</h2>
                        <p className="mb-4 policy-paragraph">Prices may change in real time depending on demand, vendor availability, location, and delivery slot. This ensures accurate pricing and reliable supply management.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">5. Product Descriptions &amp; Availability</h2>
                        <p className="mb-4 policy-paragraph">Each listing includes product name/brand, quantity, ingredients (when applicable), price, MRP, discounts, and images. Availability may vary store-to-store; items can go out of stock temporarily and we notify users when items are restocked.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">6. Accuracy &amp; Errors</h2>
                        <p className="mb-4 policy-paragraph">We work to keep product and pricing information accurate. If an incorrect price or detail is found, we may cancel or update the order. The final price at checkout is binding.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">7. Invoicing</h2>
                        <p className="mb-4 policy-paragraph">Every confirmed order includes an invoice with product details, unit price, GST, delivery charges, and final payable amount. Invoices are available to download from the My Orders section.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">8. Contact Us</h2>
                        <div className="not-italic mb-4">
                            <div className="flex items-start gap-3 mb-2">
                                <span className="text-xl mt-1">📍</span>
                                <span className="policy-paragraph">G-57, Ground Floor, Westend Mall, Janak Puri, New Delhi - 110058</span>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl">📞</span>
                                <a href="tel:+919650901450" className="policy-paragraph policy-link">+91 96509 01450</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">📧</span>
                                <a href="mailto:ops@indiaonroaming.com" className="policy-paragraph policy-link">ops@indiaonroaming.com</a>
                            </div>
                        </div>

                        <p className="mt-6 policy-paragraph">Our Commitment: We believe in clarity, honesty, and customer trust. Every product, price, and offer you see is curated to bring the best value, fastest delivery, and highest satisfaction.</p>
                    </article>
                </div>
            </main>
        </div>
    );
}

export default ProductPricing;
