import React from 'react';

// Reusable map embed component.
// Uses Google Maps search query embed (no API key required).
// Props:
// - query: string address or place to show (default: Westend Mall, Janak Puri, New Delhi)
// - height: optional iframe height
const MapEmbed = ({ query = 'G-57, Westend Mall, Janak Puri, New Delhi', height = 300 }) => {
    const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
    return (
        <div className="w-full rounded-md overflow-hidden border mt-4">
            <iframe
                title={`map-${query}`}
                src={src}
                width="100%"
                height={height}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
}

export default MapEmbed;
