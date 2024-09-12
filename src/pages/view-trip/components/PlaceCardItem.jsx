{/* eslint-disable react/prop-types */}

import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const PlaceCardItem = ({place}) => {
    const [imageUrl, setImageUrl] = useState("/images/trip-view-page.jpg");

    useEffect(() => {
        const returnValidImageUrl = async (url) => {
            const flag = await new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });

            return flag ? url : "/images/trip-view-page.jpg";
        };

        const checkImageUrl = async () => {
            const validUrl = await returnValidImageUrl(place.placeImageUrl);
            setImageUrl(validUrl);
        };

        checkImageUrl();
    }, [place.placeImageUrl]);

    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`} target={"_blank"}>
            <div
                className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md hover:cursor-pointer">
                <img
                    src={imageUrl}
                    alt={"place-image"}
                    className="w-[130px] h-[130px] rounded-xl"
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