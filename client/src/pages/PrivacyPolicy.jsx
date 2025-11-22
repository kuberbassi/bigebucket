import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 w-full">
            {/* Content renders inside the app's main layout (App.jsx provides the header/footer) */}
            <main className="w-full px-6 py-20">
                {/* Centered content block */}
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-6xl font-extrabold text-black tracking-tight">Privacy Policy</h1>
                   

                    <hr className="my-6" />
                    <article className="mt-10 text-black text-left leading-relaxed">
                    <p className="mb-4 policy-paragraph">Welcome to BigeBucket, operated by Indiaonroaming Pvt. Ltd. (“we”, “our”, or “us”). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website <a href="https://bigebucket.com" className="policy-link">https://bigebucket.com</a> or our mobile applications (“Platform”).</p>

                        <p className="mb-4 policy-paragraph">By using our Platform, you agree to this Privacy Policy. If you do not agree, please do not use our services.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                            </svg>
                            Information We Collect
                        </h2>
                        <p className="mb-2 policy-paragraph">We collect the following types of information to provide and improve our services:</p>

                        <h3 className="font-semibold mb-1">a. Personal Information</h3>
                        <p className="mb-4 policy-paragraph">When you register or use our app, we may collect:</p>
                        <ul className="list-disc pl-6 mb-4 policy-paragraph">
                            <li>Name</li>
                            <li>Mobile Number</li>
                            <li>Email Address</li>
                            <li>Delivery Address</li>
                            <li>Payment Details (processed securely via payment gateways)</li>
                        </ul>

                        <h3 className="font-semibold mb-1">b. Automatically Collected Information</h3>
                        <p className="mb-4 policy-paragraph">When you use our Platform, we automatically collect:</p>
                        <ul className="list-disc pl-6 mb-4 policy-paragraph">
                            <li>Device Information (model, OS, version, unique ID)</li>
                            <li>IP Address and Location</li>
                            <li>App Usage Data and Preferences</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>

                        <h3 className="font-semibold mb-1">c. Location Information</h3>
                        <p className="mb-4 policy-paragraph">To deliver your orders faster, we collect your live location (with your permission). You can disable location access anytime from your device settings.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.5 12a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z" />
                            </svg>
                            How We Use Your Information
                        </h2>
                        <p className="mb-4 policy-paragraph">We use your information to:</p>
                        <ul className="list-disc pl-6 mb-4 policy-paragraph">
                            <li>Process and deliver your orders quickly</li>
                            <li>Provide customer support and assistance</li>
                            <li>Send important updates, order notifications, and offers</li>
                            <li>Improve app performance and user experience</li>
                            <li>Detect fraud and enhance platform security</li>
                            <li>Comply with legal and regulatory requirements</li>
                        </ul>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v.01" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v.01" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v.01" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v.01" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                            </svg>
                            Sharing of Information
                        </h2>
                        <p className="mb-4 policy-paragraph">We may share your information with:</p>
                        <ul className="list-disc pl-6 mb-4 policy-paragraph">
                            <li>Delivery Partners – to fulfill and deliver your orders</li>
                            <li>Payment Gateways – for secure online transactions</li>
                            <li>Service Providers – who help us with technology, analytics, or customer support</li>
                            <li>Government Authorities – if required under law</li>
                        </ul>
                        <p className="mb-4 policy-paragraph">We never sell or rent your personal data to anyone.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c-1.657 0-3 .895-3 2v3h6v-3c0-1.105-1.343-2-3-2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8V7a5 5 0 00-10 0v1a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2z" />
                            </svg>
                            Data Security
                        </h2>
                        <p className="mb-4 policy-paragraph">We use advanced encryption and security measures to protect your information. However, please understand that no internet or mobile app transmission is 100% secure. Use the Platform at your own risk.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20a6 6 0 0112 0" />
                            </svg>
                             Your Choices and Rights
                        </h2>
                        <p className="mb-4 policy-paragraph">You can:</p>
                        <ul className="list-disc pl-6 mb-4 policy-paragraph">
                            <li>Access or update your profile details</li>
                            <li>Withdraw consent or delete your account anytime</li>
                            <li>Opt-out of promotional communications</li>
                            <li>Disable cookies or location access in your settings</li>
                        </ul>
                        <p className="mb-4 policy-paragraph">To delete your account or personal data, please contact us at <a href="mailto:ops@indiaonroaming.com" className="text-blue-600">ops@indiaonroaming.com</a>.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 8h.01M8 8h.01M8 16h.01" />
                            </svg>
                            Cookies Policy
                        </h2>
                        <p className="mb-4 policy-paragraph">We use cookies to personalize your experience, remember your preferences, and analyze traffic. You can choose to block cookies in your browser or app settings, but some features may not work properly.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4a1 1 0 001 1h4" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 21v-4a1 1 0 00-1-1H5" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 3L3 21" />
                            </svg>
                            Third-Party Services
                        </h2>
                        <p className="mb-4 policy-paragraph">Our Platform may contain links to third-party websites or apps (such as payment gateways, maps, or analytics tools). We are not responsible for the privacy practices of those platforms. Please review their privacy policies before sharing information.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                            </svg>
                             Children’s Privacy
                        </h2>
                        <p className="mb-4 policy-paragraph">Our services are not intended for individuals under 18 years of age. If you believe your child has provided us with personal data, please contact us immediately for removal.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-3.22-6.53" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                            </svg>
                             Policy Updates
                        </h2>
                        <p className="mb-4 policy-paragraph">We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated “Last Updated” date. Continued use of our services after changes means you accept the revised policy.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2 8.5A6.5 6.5 0 018.5 2h7A6.5 6.5 0 0122 8.5v7a6.5 6.5 0 01-6.5 6.5h-7A6.5 6.5 0 012 15.5v-7z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
                            </svg>
                                                        cd 'c:\Users\IOR TECH\OneDrive\Desktop\Blinkit_glosaryite\client'
                            npm run dev Contact Us
                        </h2>
                        <div className="not-italic mb-4">
                            <p className="font-semibold mb-2">Indiaonroaming Pvt. Ltd.</p>

                            <div className="flex items-start gap-3 mb-2">
                                {/* location pin */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z" />
                                </svg>
                                <span className="policy-paragraph">G-57, Ground Floor, Westend Mall, Janak Puri, New Delhi - 110058</span>
                            </div>

                            <div className="flex items-center gap-3 mb-2">
                                {/* phone */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.25A2.25 2.25 0 015.25 3h2.25c.621 0 1.182.247 1.606.686l1.08 1.19a1.125 1.125 0 01-.183 1.66L8.5 8.5a11.042 11.042 0 005.002 5.002l1.964-1.218a1.125 1.125 0 011.66-.183l1.19 1.08c.439.424.686.985.686 1.606V18.75A2.25 2.25 0 0118.75 21H18c-8.284 0-15-6.716-15-15V5.25z" />
                                </svg>
                                <a href="tel:+919650901450" className="policy-paragraph policy-link">+91 96509 01450</a>
                            </div>

                            <div className="flex items-center gap-3 mb-2">
                                {/* mail */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25l8.485 5.657a2.5 2.5 0 002.53 0L22 8.25" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 5.25H3A1.5 1.5 0 001.5 6.75v10.5A1.5 1.5 0 003 18.75h18a1.5 1.5 0 001.5-1.5V6.75A1.5 1.5 0 0021 5.25z" />
                                </svg>
                                <a href="mailto:ops@indiaonroaming.com" className="policy-paragraph policy-link">ops@indiaonroaming.com</a>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* globe */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2c2.5 3 4 7 4 10s-1.5 7-4 10M12 2c-2.5 3-4 7-4 10s1.5 7 4 10" />
                                </svg>
                                <a href="https://bigebucket.com" className="policy-paragraph policy-link">https://bigebucket.com</a>
                            </div>
                        </div>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 20v-1a4 4 0 014-4h8a4 4 0 014 4v1" />
                            </svg>
                            11. Grievance Officer
                        </h2>
                        <p className="mb-4 policy-paragraph">As per the Information Technology Act, 2000 and rules made thereunder, the contact details of the Grievance Officer are:</p>
                        <p className="mb-2 policy-paragraph">Grievance Officer<br />
                        Name: Operations Head, Indiaonroaming Pvt. Ltd.<br />
                        Email: <a href="mailto:ops@indiaonroaming.com" className="policy-link">ops@indiaonroaming.com</a><br />
                        Address: G-57, Ground Floor, Westend Mall, Janak Puri, New Delhi - 110058.</p>

                    </article>
                </div>
            </main>
        </div>
    );
}

export default PrivacyPolicy;
