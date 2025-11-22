import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MapEmbed from '../components/MapEmbed';

const AboutUs = () => {
    const [showMap, setShowMap] = useState(false);
    const [userCoords, setUserCoords] = useState(null);
    const [distanceText, setDistanceText] = useState('');

    // Approximate coordinates for Westend Mall, Janak Puri — update if you have exact lat/lng
    const dest = { lat: 28.6358, lng: 77.0860 };

    // Build directions URL — if userCoords available use them as origin, otherwise allow My+Location
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
            (err) => {
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
                        {/* <span className="mr-3 text-3xl">🛒</span> */}
                        About Us
                    </h1>
                    <hr className="my-6" />

                    <article className="mt-6 text-left leading-relaxed">
                        <p className="mb-4 policy-paragraph">Welcome to <strong>BigeBucket</strong>, powered by <strong>Indiaonroaming Pvt. Ltd.</strong> — your go-to platform for fast, reliable, and convenient shopping. We believe that everyday essentials should be delivered to your doorstep in minutes, not hours. That’s why we built BigeBucket — a next-generation delivery app that connects customers with local stores to make shopping smarter, faster, and easier.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            
                            Our Mission
                        </h2>
                        <p className="mb-4 policy-paragraph">Our mission is simple — To make everyday shopping effortless for everyone, everywhere. From groceries to daily needs, snacks to personal care, we’re here to make your life easier by delivering the essentials you love, right when you need them.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            Why Choose BigeBucket?
                        </h2>
                        <ul className="list-none pl-0 mb-4">
                            <li className="flex items-start gap-3 mb-2"><span className="text-2xl">⏱️</span><span className="policy-paragraph">Superfast Delivery: Get your essentials delivered within minutes.</span></li>
                            <li className="flex items-start gap-3 mb-2"><span className="text-2xl">🛍️</span><span className="policy-paragraph">Wide Range of Products: Groceries, fresh fruits, vegetables, dairy, personal care, and much more.</span></li>
                            <li className="flex items-start gap-3 mb-2"><span className="text-2xl">📍</span><span className="policy-paragraph">Location-Based Stores: We connect you to trusted local vendors near you.</span></li>
                            <li className="flex items-start gap-3 mb-2"><span className="text-2xl">💳</span><span className="policy-paragraph">Secure Payments: Multiple payment options — safe and easy.</span></li>
                            <li className="flex items-start gap-3 mb-2"><span className="text-2xl">🎯</span><span className="policy-paragraph">Reliable Service: Real-time tracking, instant updates, and quick support.</span></li>
                        </ul>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            Our Story
                        </h2>
                        <p className="mb-4 policy-paragraph">Indiaonroaming Pvt. Ltd. started with one simple idea — to bring the future of local commerce into everyone’s hands. We saw people spending time waiting for groceries or running errands, and we thought — why not make life easier? That’s how BigeBucket was born — a platform built to save time, reduce effort, and support local businesses. Today, we’re growing rapidly, serving customers across cities with a commitment to quality and convenience.</p>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            Our Values
                        </h2>
                        <ul className="list-disc pl-6 mb-4 policy-paragraph">
                            <li>Customer First: Every feature we design revolves around your convenience.</li>
                            <li>Transparency: Clear pricing, honest service, and real-time updates.</li>
                            <li>Sustainability: Supporting eco-friendly delivery and responsible packaging.</li>
                            <li>Innovation: We constantly evolve to give you a better experience every day.</li>
                        </ul>

                        <h2 className="flex items-center font-semibold mt-6 mb-2">
                            Get in Touch
                        </h2>
                        <div className="not-italic mb-4">
                            <p className="font-semibold mb-2">Indiaonroaming Pvt. Ltd.</p>
                            <div className="flex items-start gap-3 mb-2">
                                <span className="text-xl mt-1">📍</span>
                                {/* Make address clickable to reveal map/directions */}
                                <button
                                    type="button"
                                    className="policy-paragraph policy-link text-left"
                                    onClick={() => setShowMap(prev => !prev)}
                                    aria-expanded={false}
                                >
                                    G-57, Ground Floor, Westend Mall, Janak Puri, New Delhi - 110058
                                </button>
                            </div>
                            {/* Embedded map and directions (shown on click) */}
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

                        <p className="mt-6 policy-paragraph">Thank You for Choosing BigeBucket — We’re proud to serve you — faster, better, and smarter every day. Because at BigeBucket, we don’t just deliver products… we deliver happiness.</p>
                    </article>
                </div>
            </main>
        </div>
    );
}

export default AboutUs;
