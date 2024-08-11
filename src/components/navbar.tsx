import { Button } from "./ui/button";

export default function Navbar(){
    return <div className="h-16 w-full fixed top-0 flex justify-between px-5 items-center">
        <a href="/#" className="text-white font-medium text-2xl">FlashCards</a>
        <Button variant={"secondary"}>Admin Login</Button>
    </div>
}