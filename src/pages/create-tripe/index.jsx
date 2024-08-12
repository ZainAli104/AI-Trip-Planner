import {toast} from "sonner";
import {useEffect, useState} from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {chatSession} from "@/service/AIModel.jsx";
import {AI_PROMPT, SelectBudgetOptions, SelectTravelsList} from "@/constants/options.jsx";

const CreateTripePage = () => {
    const [place, setPlace] = useState();

    const [formData, setFormData] = useState([]);

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    };

    useEffect(() => {
        console.log(formData)
    }, [formData]);

    const onGenerateTrip = async () => {
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
        console.log(result.response.text());
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
                <Button onClick={onGenerateTrip}>
                    Generate Trip
                </Button>
            </div>
        </div>
    );
};

export default CreateTripePage;