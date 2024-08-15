import {toast} from "sonner";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";

import {db} from "@/service/firebaseConfig.js";

const ViewTrip = () => {
    const {tripId} = useParams();

    const [trip, setTrip] = useState();

    useEffect(() => {
        tripId && getTripData();
    }, [tripId]);

    /***
     * Get trip data
     ***/
    const getTripData = async () => {
        try {
            const docRef = doc(db, "AITrips", tripId);
            const dosSnap = await getDoc(docRef);

            if (dosSnap.exists()) {
                setTrip(dosSnap.data());
            } else {
                toast.error("No trip found!");
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            {/*  Information Section  */}

            {/*  Recommended Hotels  */}

            {/*  Daily Plan  */}

            {/*  Footer  */}
        </div>
    );
};

export default ViewTrip;