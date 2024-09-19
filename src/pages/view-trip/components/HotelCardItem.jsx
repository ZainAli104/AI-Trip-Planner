{/* eslint-disable react/prop-types */}

import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import {GetPlaceDetails, PHOTO_REF_URL} from "@/service/GlobalApi.jsx";

// eslint-disable-next-line react/prop-types
const HotelCardItem = ({hotel}) => {
    const [photoUrl, setPhotoUrl] = useState('');

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        }
        const response = await GetPlaceDetails(data)
        const images = response.data

        const photoUrl = PHOTO_REF_URL.replace('{NAME}', images.places[0].photos[3].name)
        setPhotoUrl(photoUrl);
    };

    useEffect(() => {
        hotel?.hotelName && GetPlacePhoto();
    }, [hotel]);

    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelAddress}`}
            target={"_blank"}
        >
            <div
                className="flex items-center justify-between flex-col mt-5 hover:cursor-pointer
                         hover:scale-105 transition-all rounded-xl overflow-hidden shadow-2xl pb-7 px-3 w-[300px]"
            >
                <img
                    src={photoUrl}
                    alt={hotel.hotelName}
                    className="w-[300px] h-[200px] object-cover rounded-lg"
                />
                <div className="my-2 flex flex-col gap-2">
                    <h2 className="font-medium text-lg truncate">{hotel?.hotelName}</h2>
                    <h2 className="text-xs text-gray-500 truncate">📍 {hotel?.hotelAddress}</h2>
                    <h2 className="text-sm">💰 {hotel?.price}</h2>
                    <h2 className="text-sm">⭐ {hotel?.rating} stars</h2>
                </div>
            </div>
        </Link>
    );
};

export default HotelCardItem;