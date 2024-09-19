import HotelCardItem from "./HotelCardItem.jsx";

{/* eslint-disable react/prop-types */}
const Hotels = ({trip}) => {
    return (
        <div>
            <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

            <div className="flex flex-wrap gap-5 justify-center">
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <div key={index}>
                        <HotelCardItem hotel={hotel}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hotels;