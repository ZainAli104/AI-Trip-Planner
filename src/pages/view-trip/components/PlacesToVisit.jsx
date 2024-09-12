{/* eslint-disable react/prop-types */}

import PlaceCardItem from "./PlaceCardItem.jsx";

const PlacesToVisit = ({trip}) => {
    return (
        <div className="mt-7">
            <h2 className="font-bold text-xl mt-7">Places to Visit</h2>

            <div>
                {trip?.tripData?.itinerary?.map((item, index) => (
                    <div key={index} className="mt-3">
                        <h2 className="font-bold text-lg">{item.day}</h2>

                        <div className="my-3 grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {item.activities.map((activity, i) => (
                                <div key={i}>
                                    <h2 className="font-medium text-sm text-orange-700">{activity.timeToVisit}</h2>
                                    <PlaceCardItem place={activity} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlacesToVisit;