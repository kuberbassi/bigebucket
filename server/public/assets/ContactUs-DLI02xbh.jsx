import React, { useState, useEffect } from 'react';
import MapEmbed from '../components/MapEmbed';

const ContactUs = () => {
    const [showMap, setShowMap] = useState(false);
    const [userCoords, setUserCoords] = useState(null);
    const [distanceText, setDistanceText] = useState('');

    // Approximate coordinates for Westend Mall, Janak Puri
    const dest = { lat: 28.6358, lng: 77.0860 };

    const directionsUrl = userCoords
        ? `https://www.google.com/maps/dir/?api=1&origin=${userCoords.lat},${userCoords.lng}&destination=${encodeURIComponent('G-57, Westend Mall, Janak Puri, New Delhi - 110058')}`
        : `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${encodeURIComponent('G-57, Westend Mall, Janak Puri, New Delhi - 110058')}`;

    useEffect(() => {
        if (!showMap) return;
        if (!navigator.geolocation) {
            setDistanceText('Location not available');
            return;
        }
        let cancelled = false;
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                if (cancelled) return;
                const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                setUserCoords(coords);
                const dkm = haversineDistance(coords.lat, coords.lng, dest.lat, dest.lng);
                setDistanceText(`${dkm.toFixed(2)} km`);
            },
            () => {
                if (cancelled) return;
                setDistanceText('Location permission denied');
            },
            { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 }
        );
        return () => { cancelled = true; };
    }, [showMap]);

    function haversineDistance(lat1, lon1, lat2, lon2) {
        const toRad = (v) => (v * Math.PI) / 180;
        const R = 6371; // km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    return (
        <div className="min-h-screen bg-gray-50 w-full">
            <main className="w-full px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-black tracking-tight flex items-center justify-center">
                        Contact Us
                    </h1>

                    <hr className="my-6" />

                    <article className="mt-6 text-left leading-relaxed">
                        <p className="mb-4 policy-paragraph">Welcome to <strong>BigeBucket</strong>! We’re always happy to help you with your orders, delivery queries, feedback, or partnership requests. Our support team is here to make sure your experience with BigeBucket is smooth, fast, and reliable.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">Company Information</h2>
                        <p className="mb-4 policy-paragraph">Indiaonroaming Pvt. Ltd.</p>
                        <div className="not-italic mb-4">
                            <div className="flex items-start gap-3 mb-2">
                                <span className="text-xl mt-1">📍</span>
                                <button
                                    type="button"
                                    className="policy-paragraph policy-link text-left"
                                    onClick={() => setShowMap(prev => !prev)}
                                >
                                    G-57, Ground Floor, Westend Mall, Janak Puri, New Delhi - 110058
                                </button>
                            </div>
                            {showMap && (
                                <div className="mt-4">
                                    <MapEmbed query={'G-57, Westend Mall, Janak Puri, New Delhi - 110058'} height={350} />
                                    <div className="mt-3 text-sm text-gray-700">
                                        {distanceText ? (
                                            <div className="mb-2">Distance: <strong>{distanceText}</strong></div>
                                        ) : (
                                            <div className="mb-2">Detecting your location to calculate distance…</div>
                                        )}
                                        <a
                                            href={directionsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                        >
                                            Get directions ↗
                                        </a>
                                    </div>
                                </div>
                            )}
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

                        <h2 className="flex items-center font-semibold mt-6 mb-2"><span className="mr-2">🕒</span>Customer Support Hours</h2>
                        <p className="mb-4 policy-paragraph">Monday – Sunday: 9:00 AM – 9:00 PM. We aim to respond to all queries within 24 hours.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2"><span className="mr-2">💬</span>Get in Touch With Us</h2>
                        <p className="mb-4 policy-paragraph">Whether it’s an issue with an order, product suggestion, or delivery update — we’re just one tap away!</p>

                        <h3 className="flex items-center font-semibold mt-6 mb-2"><span className="mr-2">📱</span>App Support</h3>
                        <p className="mb-4 policy-paragraph">Use the “Help & Support” option in the BigeBucket app for order tracking, payment and refund issues, delivery feedback, and account assistance.</p>

                        <h3 className="flex items-center font-semibold mt-6 mb-2"><span className="mr-2">💻</span>Website Support</h3>
                        <p className="mb-4 policy-paragraph">Visit <a href="https://bigebucket.com/contact" className="policy-link">https://bigebucket.com/contact</a> to submit a contact form, report a technical issue, or request account changes.</p>

                        <h3 className="flex items-center font-semibold mt-6 mb-2"><span className="mr-2">🛒</span>Business / Vendor Enquiries</h3>
                        <p className="mb-4 policy-paragraph">Are you a seller or local business wanting to join BigeBucket? Write to us at: <a href="mailto:ops@indiaonroaming.com" className="policy-link">ops@indiaonroaming.com</a></p>

                        <h3 className="flex items-center font-semibold mt-6 mb-2"><span className="mr-2">⚖️</span>Grievance Officer</h3>
                        <p className="mb-4 policy-paragraph">Name: Operations Head<br/>Email: <a href="mailto:ops@indiaonroaming.com" className="policy-link">ops@indiaonroaming.com</a><br/>Address: G-57, Ground Floor, Westend Mall, Janak Puri, New Delhi - 110058</p>

                        <h3 className="flex items-center font-semibold mt-6 mb-2"><span className="mr-2">🔒</span>Privacy & Data Protection</h3>
                        <p className="mb-4 policy-paragraph">Your personal data is used only to provide support and resolve your requests. We do not share, sell, or misuse your information. To learn more, please visit our <a href="/privacy-policy" className="policy-link">Privacy Policy</a>.</p>

                        <p className="mt-6 policy-paragraph"> We’re Here for You — At BigeBucket, customer satisfaction comes first. Thank you for being a valued part of the BigeBucket family!</p>
                    </article>
                </div>
            </main>
        </div>
    );
}

export default ContactUs;
