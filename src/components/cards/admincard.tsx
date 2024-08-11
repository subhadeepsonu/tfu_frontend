import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import axios from "axios";
import Cookies from "universal-cookie";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Edit } from "lucide-react";
import EditCard from "../forms/editcard";
export default function AdminCard(props:{
    question:string,
    answer:string,
    id:string
}){
    const cookie = new Cookies()
    const token = cookie.get("token")
    const queryClient = useQueryClient()
    const MuatateDelete = useMutation({
        mutationFn:async ()=>{
            const responce = await axios.delete(`http://13.201.137.42:3000/flashcard`,{
                headers:{
                    Authorization:token
                },
                data:{
                    id:props.id
                }
            })
            return responce.data
        },
        onSettled:(data)=>{
            queryClient.invalidateQueries({queryKey:["cards"]})
            console.log(data)
        }
    })
    return <div className="h-40 flex text-white  justify-around items-start pl-2 flex-col w-80 backdrop-blur-sm bg-white/15 rounded-lg">
            <p>Q. {props.question}</p>
            <p>Ans: {props.answer}</p>
            <div className="w-full flex justify-around items-center">
            <Sheet>
            <SheetTrigger><Button ><Edit></Edit></Button></SheetTrigger>
            <SheetContent>
                 <SheetHeader>
                      <SheetTitle>Edit cards</SheetTitle>
                         <SheetDescription>
                              <EditCard id={props.id}></EditCard>
                         </SheetDescription>
                 </SheetHeader>
             </SheetContent>
            </Sheet>
            <Button onClick={()=>{
                MuatateDelete.mutate()
            }} disabled={MuatateDelete.isPending} variant={"destructive"}>{(MuatateDelete.isPending)?"loading":"Delete"}</Button>
            </div>
    </div>
}