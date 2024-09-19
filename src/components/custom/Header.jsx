import {Button} from "@/components/ui/button.jsx";

const Header = () => {
    return (
        <header className="p-3 shadow-sm flex justify-between items-center px-5">
            <img
                src="/logo.svg"
                alt="logo"
                className="hover:cursor-pointer"
                onClick={() => window.location.href = "/"}
            />
            <div>
                <Button>Sign In</Button>
            </div>
        </header>
    );
};

export default Header;