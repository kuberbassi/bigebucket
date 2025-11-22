import React from 'react';

const RefundCancellation = () => {
    return (
        <div className="min-h-screen bg-gray-50 w-full">
            <main className="w-full px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-black tracking-tight flex items-center justify-center">
                        Refund &amp; Cancellation Policy
                    </h1>

                    <hr className="my-6" />

                    <article className="mt-6 text-left leading-relaxed">
                        <p className="mb-4 text-sm text-gray-600">Last Updated: November 2025</p>

                        <p className="mb-4 policy-paragraph">Welcome to <strong>BigeBucket</strong>, operated by <strong>Indiaonroaming Pvt. Ltd.</strong> We value your trust and aim to ensure a smooth and worry-free shopping experience every time you order through <a href="https://bigebucket.com" className="policy-link">https://bigebucket.com</a> or our mobile app. This Refund &amp; Cancellation Policy explains when and how you can cancel an order, and how refunds are handled.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">1. Order Cancellation Policy</h2>
                        <p className="mb-4 policy-paragraph">You can cancel your order before dispatch from the store. Once your order has been packed or assigned to a delivery partner, it cannot be cancelled. Cancellation requests after dispatch will not be eligible for refunds. To cancel, go to “My Orders” → “Cancel Order” in the app, or contact us at <a href="mailto:ops@indiaonroaming.com" className="policy-link">ops@indiaonroaming.com</a> immediately.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">2. Automatic Cancellation</h2>
                        <p className="mb-4 policy-paragraph">Orders may be automatically cancelled if products are unavailable, delivery is not possible to your location, payment fails, or technical issues occur. In such cases, any deducted amount will be automatically refunded to your original payment method.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">3. Refund Policy</h2>
                        <p className="mb-4 policy-paragraph">Refunds are issued only for eligible cases: prepaid order refunds are processed within 5–7 business days after confirmation. For COD orders, eligible refunds are issued via bank transfer or wallet credit (details requested via email). Refund timelines may vary depending on your bank or payment gateway.</p>
                        <p className="mb-4 policy-paragraph">Refunds will not be provided if the customer provided an incorrect delivery address, was unavailable at delivery, or returned an item without a valid reason.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">4. Damaged, Missing, or Wrong Items</h2>
                        <p className="mb-4 policy-paragraph">If you receive damaged, expired, wrong, or missing items, report it within 24 hours of delivery via the app or email <a href="mailto:ops@indiaonroaming.com" className="policy-link">ops@indiaonroaming.com</a>. Our team will verify and, if valid, process a refund or replacement at no extra cost.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">5. Non-Refundable Products</h2>
                        <p className="mb-4 policy-paragraph">Perishable items (fruits, vegetables, dairy, frozen foods), opened/used products, personal care/hygiene items, and items marked “Non-Returnable” are typically not eligible for refunds. Please check your order at delivery.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">6. Late or Missing Refunds</h2>
                        <p className="mb-4 policy-paragraph">If you haven’t received your refund yet, check your bank/wallet statement and contact your payment provider. If still unresolved after 7 business days, email us at <a href="mailto:ops@indiaonroaming.com" className="policy-link">ops@indiaonroaming.com</a> with your order ID and payment proof.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">7. Policy Updates</h2>
                        <p className="mb-4 policy-paragraph">We may update this Refund &amp; Cancellation Policy from time to time. Changes will be posted on this page with an updated “Last Updated” date.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">8. Contact Us</h2>
                        <div className="not-italic mb-4">
                            <div className="flex items-start gap-3 mb-2">
                                <span className="text-xl mt-1">📍</span>
                                <span className="policy-paragraph">G-57, Ground Floor, Westend Mall, Janak Puri, New Delhi - 110058</span>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl">📞</span>
                                <a href="tel:+919650901450" className="policy-paragraph text-blue-600">+91 96509 01450</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">📧</span>
                                <a href="mailto:ops@indiaonroaming.com" className="policy-paragraph policy-link">ops@indiaonroaming.com</a>
                            </div>
                        </div>

                        <p className="mt-6 policy-paragraph"> Our Promise: We handle refund and cancellation requests fairly, transparently, and promptly so you can shop with confidence.</p>
                    </article>
                </div>
            </main>
        </div>
    );
}

export default RefundCancellation;
