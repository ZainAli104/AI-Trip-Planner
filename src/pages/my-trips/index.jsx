import {useEffect, useState} from "react";
import {useNavigation} from "react-router-dom";
import {collection, query, where, getDocs} from "firebase/firestore";

import {db} from "@/service/firebaseConfig.js";
import {UserTripCardItem} from "./component/UserTripCardItem.jsx";

const MyTrips = () => {
    const navigation = useNavigation();

    const [userTrips, setUserTrips] = useState([]);

    const GetUserTrips = async () => {
        const userJSONString = localStorage.getItem('user');
        const user = JSON.parse(userJSONString);
        if (!user) {
            navigation.navigate('/');
        }

        setUserTrips([]);
        const q = query(collection(db, "AITrips"), where("userEmail", "==", user.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserTrips(prev => [...prev, { id: doc.id, ...doc.data() }]);
        });
    };

    useEffect(() => {
        GetUserTrips();
    }, []);

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">My Trips</h2>

            <div className="mt-10 flex flex-wrap gap-5">
                {userTrips.map((trip, index) => (
                    <UserTripCardItem key={index} trip={trip} />
                ))}

                {userTrips.length === 0 && (
                    <div className="w-full text-center">
                        <h2 className="text-lg">No trips found</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTrips;