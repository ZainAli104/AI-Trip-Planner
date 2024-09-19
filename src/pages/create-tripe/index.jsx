import axios from "axios";
import {toast} from "sonner";
import {useState} from "react";
import {FcGoogle} from "react-icons/fc";
import {useNavigate} from "react-router-dom";
import {useGoogleLogin} from "@react-oauth/google";
import {collection,addDoc} from "firebase/firestore";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import {db} from "@/service/firebaseConfig.js";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {chatSession} from "@/service/AIModel.jsx";
import {AI_PROMPT, SelectBudgetOptions, SelectTravelsList} from "@/constants/options.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader, DialogTitle
} from "@/components/ui/dialog";

const CreateTripePage = () => {
    const navigate = useNavigate();

    const [place, setPlace] = useState();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const onOpenChange = (open) => {
        if (!open) {
            setOpenDialog(false);
        }
    };

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            await GetUserProfile(codeResponse)
        },
        onError: (error) => console.error(error),
    });

    const GetUserProfile = async (tokenInfo) => {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo.access_token}`,
                Accept: 'application/json'
            }
        });

        localStorage.setItem('user', JSON.stringify(res.data))
        setOpenDialog(false)
        await onGenerateTrip()
    };

    const onGenerateTrip = async () => {
        try {
            setLoading(true);
            const user = localStorage.getItem("user")
            if (!user) {
                setOpenDialog(true);
                return
            }

            if (!formData.location || !formData.noOfDays || !formData.budget || !formData.travelWith) {
                toast("Please fill all the fields");
                return;
            }
            if (formData.noOfDays > 5) {
                toast("You can't plan a trip for more than 5 days");
                return;
            }

            const FINAL_PROMPT = AI_PROMPT
                .replace('{location}', formData.location.label)
                .replace('{noOfDays}', formData.noOfDays)
                .replace('{travelWith}', formData.travelWith)
                .replace('{budget}', formData.budget)
                .replace('{noOfDays}', formData.noOfDays);

            const result = await chatSession.sendMessage(FINAL_PROMPT);
            await saveAITrip(result.response.text());
        } catch (e) {
            console.error(e);
            toast("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const saveAITrip = async (trip) => {
        const user = JSON.parse(localStorage.getItem("user"));

        const result = await addDoc(collection(db, "AITrips"), {
            userSelection: formData,
            tripData: JSON.parse(trip),
            userEmail: user.email
        });

        navigate('/view-trip/'+result.id);
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
            <p className="mt-3 text-gray-500 text-xl">Just provide some basic information, and our trip planner will
                generate a customized itinerary based on
                your preferences.</p>

            <div className="mt-20 flex flex-col gap-10">
                <div>
                    <h2 className="text-xl my-3 font-medium">What is destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => {
                                setPlace(v)
                                handleInputChange('location', v)
                            }
                        }}
                    />
                </div>

                <div>
                    <h2 className="text-xl my-3 font-medium">
                        How many days are you planning your trip?
                    </h2>
                    <Input
                        placeholder={"3 days"}
                        type={"number"}
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                    />
                </div>

                <div>
                    <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectBudgetOptions.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                                    ${formData.budget === item.title ? 'shadow-lg border-black' : ''}
                                `}
                                onClick={() => handleInputChange('budget', item.title)}
                            >
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next
                        adventure?</h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectTravelsList.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                                    ${formData.travelWith === item.people ? 'shadow-lg border-black' : ''}
                                `}
                                onClick={() => handleInputChange('travelWith', item.people)}
                            >
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="my-10 flex justify-end">
                <Button onClick={onGenerateTrip} disabled={loading}>
                    {loading ?
                        <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
                        : "Generate Trip"
                    }
                </Button>
            </div>

            <Dialog open={openDialog} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <img src="/logo.svg" alt="logo"/>
                            <h2 className="text-bold text-lg mt-5">Sign In with Google</h2>
                        </DialogTitle>
                        <DialogDescription>
                            Sign In to the app with Google authentication securely

                            <Button className="w-full mt-5 flex items-center gap-3" onClick={login}>
                                <FcGoogle className="h-7 w-7"/>
                                Sign In with Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateTripePage;