import {toast} from "sonner";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";

import Hotels from "../components/Hotels.jsx";
import {db} from "@/service/firebaseConfig.js";
import Footer from "@/components/custom/Footer.jsx";
import InfoSection from "../components/InfoSection.jsx";
import PlacesToVisit from "../components/PlacesToVisit.jsx";

const ViewTrip = () => {
    const {tripId} = useParams();

    const [trip, setTrip] = useState();

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

    useEffect(() => {
        tripId && getTripData();
    }, [tripId]);

    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            {/*  Information Section  */}
            <InfoSection trip={trip} />

            {/*  Recommended Hotels  */}
            <Hotels trip={trip} />

            {/*  Daily Plan  */}
            <PlacesToVisit trip={trip} />

            {/*  Footer  */}
            <Footer />
        </div>
    );
};

export default ViewTrip;