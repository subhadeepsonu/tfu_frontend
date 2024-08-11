import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import Cookies from "universal-cookie"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
export default function LoginPage(){
    const cookie = new Cookies()
    const navigate = useNavigate();
    const schema = z.object({
        username: z.string().min(3),
        password: z.string().min(8),
    })
    const form = useForm({
        resolver: zodResolver(schema),
    })
    const values = form.getValues()
    const MutateLogin = useMutation({
        mutationFn:async ()=>{
            const response = await axios.post("http://localhost:3000/login",{
                username: values.username,
                password: values.password
            })
            console.log(response.data)
            return response.data
        },
        onSettled:(data)=>{
            if(data.success){
                toast.success("Logged in")
                cookie.set("token",data.message)
                navigate("/admin")
            }else{
                toast.error("Failed to login")
                console.log("failed")
            }
        }
    })
    return (    
        <div className="flex flex-col items-center justify-center w-full h-screen"
        style={{ backgroundImage: "url('https://utfs.io/f/c1f3b2de-d101-4709-b5dc-db30c29487ef-qqbpro.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
           <div className="h-96 w-96 backdrop-blur-sm bg-white/15 rounded-lg p-2">
           <p className="flex justify-center items-center font-medium  text-2xl">Login</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(()=>{
                    console.log("submit")
                        MutateLogin.mutate()
                    })} className="h-72 flex justify-around items-center flex-col w-full">
                    <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="w-80" placeholder="admin123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input className="w-80" type="password" placeholder="TFUROUND1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"secondary"} disabled={MutateLogin.isPending} type="submit">Submit</Button>        
                    </form>
                </Form>
           </div>
        </div>
    )
}