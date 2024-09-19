import {FcGoogle} from "react-icons/fc";

import {Button} from "@/components/ui/button.jsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.jsx";

// eslint-disable-next-line react/prop-types
const SignInModel = ({openDialog, onOpenChange, login}) => {
    return (
        <Dialog open={openDialog} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <img src="/logo.svg" alt="logo"/>
                        <span className="text-bold text-lg mt-5">Sign In with Google</span>
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
    );
};

export default SignInModel;
