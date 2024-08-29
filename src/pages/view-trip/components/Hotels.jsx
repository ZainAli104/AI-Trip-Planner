{/* eslint-disable react/prop-types */}

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

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <div key={index} className="flex items-center justify-between flex-col mt-5">
                        <img
                            src={validImageUrl[hotel.hotelImageUrl] ? hotel.hotelImageUrl : "/images/trip-view-page.jpg"}
                            alt={hotel.hotelName}
                            className="w-full h-44 object-cover rounded-lg"
                        />
                        <div className="my-2">
                            <h2 className="font-medium text-lg">{hotel.hotelName}</h2>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">{hotel.price}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hotels;