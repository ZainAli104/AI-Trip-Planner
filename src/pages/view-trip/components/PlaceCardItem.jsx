{/* eslint-disable react/prop-types */}
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import {GetPlaceDetails, PHOTO_REF_URL} from "@/service/GlobalApi.jsx";

const PlaceCardItem = ({place}) => {
    const [photoUrl, setPhotoUrl] = useState('');

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place.placeName
        }
        const response = await GetPlaceDetails(data)
        const images = response.data

        const photoUrl = PHOTO_REF_URL.replace('{NAME}', images.places[0].photos[3].name)
        setPhotoUrl(photoUrl);
    };

    useEffect(() => {
        place.placeName && GetPlacePhoto();
    }, [place]);

    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`} target={"_blank"}>
            <div
                className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md hover:cursor-pointer">
                <img
                    src={photoUrl}
                    alt={"place-image"}
                    className="w-[180px] h-[130px] object-cover rounded-xl"
                />

                <div>
                    <h2 className="font-bold text-lg">{place.placeName}</h2>
                    <p className="text-sm text-gray-500">{place.placeDetails}</p>
                    <h2 className="mt-2">💲 {place.ticketPricing}</h2>
                </div>
            </div>
        </Link>
    );
};

export default PlaceCardItem;