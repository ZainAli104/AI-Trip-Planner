import axios from "axios";
import {useState} from "react";
import {googleLogout, useGoogleLogin} from "@react-oauth/google";

import {Button} from "@/components/ui/button.jsx";
import SignInModel from "@/components/custom/SignInModel.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";

const Header = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const onOpenChange = (open) => {
        if (!open) {
            setOpenDialog(false);
        }
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
        window.location.reload();
    };

    return (
        <header className="p-3 shadow-sm flex justify-between items-center px-5">
            <img
                src="/logo.svg"
                alt="logo"
                className="hover:cursor-pointer"
                onClick={() => window.location.href = "/"}
            />
            <div>
                {user ? (
                    <div className="flex">
                        <a href="/my-trips">
                            <Button variant="outline" className="rounded-full">
                                My Trips
                            </Button>
                        </a>

                        <Popover>
                            <PopoverTrigger>
                                <img
                                    src={user?.picture}
                                    alt="profile"
                                    className="rounded-full h-10 w-10 ml-3"
                                    onError={(e) => e.target.src = "/images/trip-view-page.jpg"}
                                />
                            </PopoverTrigger>
                            <PopoverContent className="mr-3 shadow-xl">
                                <div className="p-3">
                                    <p className="text-sm font-semibold">{user?.name}</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                                <div className="border-t border-gray-200">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => {
                                            googleLogout();
                                            localStorage.clear();
                                            window.location.reload();
                                        }}
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                ) : (
                    <Button
                        onClick={() => setOpenDialog(true)}
                    >
                        Sign In
                    </Button>
                )}
            </div>

            <SignInModel
                openDialog={openDialog}
                onOpenChange={onOpenChange}
                login={login}
            />
        </header>
    );
};

export default Header;