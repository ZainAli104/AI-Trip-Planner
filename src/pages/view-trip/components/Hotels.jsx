{/* eslint-disable react/prop-types */}

import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Hotels = ({trip}) => {
    const [validImageUrl, setValidImageUrl] = useState({});

    useEffect(() => {
        const checkImageUrls = async () => {
            const results = {};
            for (const hotel of trip?.tripData?.hotelOptions || []) {
                const isValid = await isImageUrlValid(hotel.hotelImageUrl);
                results[hotel.hotelImageUrl] = isValid;
            }
            setValidImageUrl(results);
        };

        checkImageUrls();
    }, [trip]);

    const isImageUrlValid = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    };

    return (
        <div>
            <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

            <div className="flex flex-wrap gap-5 justify-center">
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <Link
                        key={index}
                        to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelAddress}`}
                        target={"_blank"}
                    >
                    <div
                        className="flex items-center justify-between flex-col mt-5 hover:cursor-pointer
                         hover:scale-105 transition-all rounded-xl overflow-hidden shadow-2xl pb-7"
                    >
                        <img
                            src={validImageUrl[hotel.hotelImageUrl] ? hotel.hotelImageUrl : "/images/trip-view-page.jpg"}
                            alt={hotel.hotelName}
                            className="w-full h-44 object-cover rounded-lg"
                        />
                        <div className="my-2 flex flex-col gap-2">
                            <h2 className="font-medium text-lg">{hotel?.hotelName}</h2>
                            <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
                            <h2 className="text-sm">💰 {hotel?.price}</h2>
                            <h2 className="text-sm">⭐ {hotel?.rating} stars</h2>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Hotels;