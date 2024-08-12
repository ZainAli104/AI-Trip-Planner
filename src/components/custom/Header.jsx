import {Button} from "@/components/ui/button.jsx";

function Header() {
    return (
        <header className="p-3 shadow-sm flex justify-between items-center px-5">
            <img src="/logo.svg" alt="logo"/>
            <div>
                <Button>Sign In</Button>
            </div>
        </header>
    );
}

export default Header;