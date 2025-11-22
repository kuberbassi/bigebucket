import React from 'react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-gray-50 w-full">
            <main className="w-full px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-black tracking-tight flex items-center justify-center">
                        {/* <span className="mr-3 text-3xl">🧾</span> */}
                        Terms & Conditions
                    </h1>
                    <hr className="my-6" />

                    <article className="mt-6 text-left leading-relaxed">
                       <p className="mb-4 policy-paragraph">Welcome to <strong>BigeBucket</strong>, operated by <strong>Indiaonroaming Pvt. Ltd.</strong> (“Company”, “we”, “us”, or “our”). These Terms & Conditions govern your access and use of our website <a href="https://bigebucket.com" className="policy-link">https://bigebucket.com</a> and mobile application (“Platform”). By accessing or using our Platform, you agree to these Terms. If you do not agree, please stop using our services immediately.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">1. Eligibility</h2>
                        <p className="mb-4 policy-paragraph">To use our Platform, you must be at least 18 years old and capable of entering into a legally binding agreement. If you are under 18, you may use our Platform only with the supervision of a parent or legal guardian.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">2. Services We Provide</h2>
                        <p className="mb-4 policy-paragraph">BigeBucket is an online delivery platform that enables users to order groceries, essentials, and other daily-use items from nearby stores. We act as a facilitator between customers and local vendors to ensure smooth and quick deliveries. We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">3. Pricing and Payments</h2>
                        <p className="mb-4 policy-paragraph">All prices listed on our Platform are in Indian Rupees (INR). Prices and availability of products may change without prior notice. Payment can be made through secure gateways — UPI, debit/credit card, wallet, or cash on delivery (if available). In case of any payment failure, please contact our support team immediately at <a href="mailto:ops@indiaonroaming.com" className="policy-link">ops@indiaonroaming.com</a>.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">4. Orders and Deliveries</h2>
                        <p className="mb-4 policy-paragraph">Once an order is placed, it cannot be cancelled once dispatched. Estimated delivery time may vary depending on your location and product availability. We aim to deliver your products quickly and safely. You agree to provide accurate delivery details; we are not responsible for delays due to incorrect addresses or unavailable recipients.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">5. Returns, Refunds & Replacements</h2>
                        <p className="mb-4 policy-paragraph">Damaged, expired, or missing items must be reported within 24 hours of delivery. Refunds or replacements are processed as per our company’s return policy. Some perishable goods (like fruits, vegetables, or dairy) may not be eligible for return.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">6. User Responsibilities</h2>
                        <p className="mb-4 policy-paragraph">When using our Platform, you agree to provide accurate personal and contact details, use the Platform only for lawful purposes, and not misuse, copy, or reverse-engineer our app or services. Any fraudulent or abusive activity may result in suspension or termination of your account.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">7. Intellectual Property</h2>
                        <p className="mb-4 policy-paragraph">All content on the Platform — including logos, design, text, graphics, and software — is the property of Indiaonroaming Pvt. Ltd. You may not reproduce, distribute, or use our content without prior written consent.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">8. Third-Party Links</h2>
                        <p className="mb-4 policy-paragraph">Our Platform may contain links to third-party sites or apps for payments, tracking, or advertisements. We are not responsible for the content, privacy, or practices of those third parties.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">9. Privacy Policy</h2>
                        <p className="mb-4 policy-paragraph">Your use of our Platform is also governed by our Privacy Policy. Please review it to understand how we collect, use, and safeguard your personal data.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">10. Limitation of Liability</h2>
                        <p className="mb-4 policy-paragraph">We are not liable for delays or failures due to factors beyond our control (traffic, weather, technical issues, etc.), losses arising from unauthorized use of your account, or errors in third-party services (e.g., payment gateways or logistics partners). Our total liability will not exceed the amount paid by you for the specific order in dispute.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">11. Changes to These Terms</h2>
                        <p className="mb-4 policy-paragraph">We may update or modify these Terms & Conditions anytime. Changes will be effective immediately upon posting on the Platform. Continued use means you accept the revised terms.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">12. Contact Us</h2>
                        <div className="not-italic mb-4">
                            <p className="font-semibold mb-2">Indiaonroaming Pvt. Ltd.</p>
                            <div className="flex items-start gap-3 mb-2">

                                <span className="policy-paragraph">G-57, Ground Floor, Westend Mall, Janak Puri, New Delhi - 110058</span>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl">📞</span>
                                <a href="tel:+919650901450" className="policy-paragraph policy-link">+91 96509 01450</a>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl">📧</span>
                                <a href="mailto:ops@indiaonroaming.com" className="policy-paragraph policy-link">ops@indiaonroaming.com</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">🌐</span>
                                <a href="https://bigebucket.com" className="policy-paragraph policy-link">https://bigebucket.com</a>
                            </div>
                        </div>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">13. Grievance Officer</h2>
                        <p className="mb-4 policy-paragraph">Grievance Officer — Name: Operations Head, Indiaonroaming Pvt. Ltd. Email: <a href="mailto:ops@indiaonroaming.com" className="text-blue-600">ops@indiaonroaming.com</a>. Address: G-57, Ground Floor, Westend Mall, Janak Puri, New Delhi - 110058.</p>

                        <p className="mt-6 policy-paragraph">❤️ Thank You for Choosing BigeBucket — By continuing to use our services, you agree to follow these terms — helping us deliver a smooth, fast, and trustworthy shopping experience every time you order.</p>
                    </article>
                </div>
            </main>
        </div>
    );
}

export default Terms;
