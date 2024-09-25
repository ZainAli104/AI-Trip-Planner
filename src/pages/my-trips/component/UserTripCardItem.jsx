{/* eslint-disable react/prop-types */}
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import {GetPlaceDetails, PHOTO_REF_URL} from "@/service/GlobalApi.jsx";

export const UserTripCardItem = ({trip}) => {
    const [photoUrl, setPhotoUrl] = useState('');

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const response = await GetPlaceDetails(data)
        const images = response.data

        const photoUrl = PHOTO_REF_URL.replace('{NAME}', images.places[0].photos[3].name)
        setPhotoUrl(photoUrl);
    };

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip]);

    return (
        <Link to={`/view-trip/${trip?.id}`}>
            <div className="hover:cursor-pointer transition-all hover:scale-105 shadow-2xl pb-7 px-3 w-[300px]
            overflow-hidden rounded-xl">
                <img
                    src={photoUrl ? photoUrl : "/images/trip-view-page.jpg"}
                    alt="trip"
                    className="w-full h-60 object-cover rounded-xl"
                />

                <div>
                    <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
                    <h2 className="text-sm text-gray-500">
                        {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget
                    </h2>
                </div>
            </div>
        </Link>
    );
};