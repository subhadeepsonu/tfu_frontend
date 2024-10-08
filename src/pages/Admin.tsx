import AdminCard from "@/components/cards/admincard"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import AddCard from "@/components/forms/addcard"
  
export default function Adminpage(){
    const cookie = new Cookies()
    const token = cookie.get("token")
    const navigate = useNavigate();
    if(!token){
        navigate("/login")
    }
    const QueryCards = useQuery({
        queryKey:["cards"],
        queryFn:async()=>{
            const response = await axios.get(`http://13.201.137.42:3000/flashcard`,)
            return response.data
        }
    })
    
    if(QueryCards.isLoading){
        return <div>Loading...</div>
    }   
    if(QueryCards.isError){
        return <div>Error</div>
    }
    return (    
        <div className="flex flex-col items-center justify-start pt-20 w-full min-h-screen bg-gray-800">
            <Sheet>
            <SheetTrigger><Button variant={"secondary"}  className="fixed z-10 bottom-5 right-5">Add Card</Button></SheetTrigger>
            <SheetContent>
                 <SheetHeader>
                      <SheetTitle>Add cards</SheetTitle>
                         <SheetDescription>
                              <AddCard></AddCard>
                         </SheetDescription>
                 </SheetHeader>
             </SheetContent>
            </Sheet>
            
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:frid-cols-4 gap-5">
               {QueryCards.data.message.map((card:any)=>{
                return <AdminCard id={card.id} key={card.id} question={card.title} answer={card.description}></AdminCard>
               })}
           </div>
        </div>
    )
}