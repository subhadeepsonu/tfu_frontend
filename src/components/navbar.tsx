import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import Cookies from "universal-cookie";

export default function Navbar(){
    const cookie = new Cookies()
    const token = cookie.get("token")
    const navigate = useNavigate();
    return <div className="h-16 w-full fixed top-0 flex justify-between px-5 items-center">
        <Link to="/" className="text-white font-medium text-2xl">FlashCards</Link>
        <div className="w-80 flex justify-end items-center">
        {(token)?<Button className="mr-2" variant={"secondary"} 
        onClick={()=>{
            cookie.remove("token")
            navigate("/")
        }}
        >Logout</Button>:""}
        {(token)? <Button onClick={()=>{
            navigate("/admin")
        }} variant={"secondary"}>Admin Panel</Button>: <Button onClick={()=>{
            navigate("/login")
        }} variant={"secondary"}>Admin Login</Button>}
       </div>
    </div>
}