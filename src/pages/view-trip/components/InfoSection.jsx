{/* eslint-disable react/prop-types */}
import { IoIosSend } from "react-icons/io";

import {Button} from "@/components/ui/button.jsx";

const InfoSection = ({trip}) => {
    return (
        <div>
            <img
                src="/images/trip-view-page.jpg"
                alt="trip"
                className="w-full h-96 object-cover rounded-xl"
            />

            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
                    <div className="flex gap-4 flex-col sm:flex-row">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">📅 {trip?.userSelection?.noOfDays} Days</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">💰 {trip?.userSelection?.budget}</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">🥂 {trip?.userSelection?.travelWith}</h2>
                    </div>
                </div>
                <Button>
                    <IoIosSend />
                </Button>
            </div>
        </div>
    );
};

export default InfoSection;