import React from 'react';

const DeliveryShipping = () => {
    return (
        <div className="min-h-screen bg-gray-50 w-full">
            <main className="w-full px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-black tracking-tight flex items-center justify-center">
                        Delivery &amp; Shipping Policy
                    </h1>

                    <hr className="my-6" />

                    <article className="mt-6 text-left leading-relaxed">
                        <p className="mb-4 policy-paragraph">At <strong>BigeBucket</strong> (Indiaonroaming Pvt. Ltd.), we strive to deliver your orders quickly and safely. This Delivery &amp; Shipping Policy explains our delivery windows, shipping fees, tracking, and related processes.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">Delivery Timeframes</h2>
                        <p className="mb-4 policy-paragraph">We aim for superfast delivery where available — typically within minutes in our instant-delivery zones. Estimated delivery times vary based on your location, product availability, and local traffic conditions.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">Service Areas</h2>
                        <p className="mb-4 policy-paragraph">Delivery is available in selected cities and designated delivery zones. During checkout, enter your delivery address to confirm availability and estimated delivery time for your location.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">Shipping Fees &amp; Charges</h2>
                        <p className="mb-4 policy-paragraph">Delivery fees may vary by location, order value, and promotional offers. Any applicable delivery or service charges will be shown to you at checkout before payment.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">Order Handling &amp; Packaging</h2>
                        <p className="mb-4 policy-paragraph">We and our partner stores ensure that orders are carefully packed. Perishable items receive appropriate handling. If an item arrives damaged, expired, or missing, report it within 24 hours so we can assist with replacement or refund per our return policy.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">Tracking Your Order</h2>
                        <p className="mb-4 policy-paragraph">You will receive real-time order status updates and tracking within the app. Use the order tracking screen to see live courier location and estimated arrival time.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">Cancellations &amp; Failed Deliveries</h2>
                        <p className="mb-4 policy-paragraph">Orders can typically be cancelled before they are dispatched. Once dispatched, cancellation may not be possible. If delivery fails due to an incorrect address or unavailable recipient, additional charges may apply for re-delivery.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">Returns &amp; Exchanges</h2>
                        <p className="mb-4 policy-paragraph">For issues with items (damaged, expired, or missing), please report within 24 hours. Returns and replacements are handled per our Returns Policy. Some perishable items may not be eligible for return.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">Liability &amp; Limitations</h2>
                        <p className="mb-4 policy-paragraph">We are not responsible for delays caused by events outside our control (weather, traffic, strikes). Our liability is limited to the order value for issues arising from our delivery service.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2"><span className="mr-2">📞</span>Contact for Delivery Issues</h2>
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

                        <p className="mt-6 policy-paragraph">If you have delivery-related feedback or concerns, reach out and we’ll do our best to resolve them quickly.</p>
                    </article>
                </div>
            </main>
        </div>
    );
}

export default DeliveryShipping;
