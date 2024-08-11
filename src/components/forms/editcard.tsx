import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
export default function EditCard(props:{
  id:string
}) {
    const cookie = new Cookies();
    const token = cookie.get("token");
    const QueryClient = useQueryClient();
    
    const schema = z.object({
        title:z.string(),
        description:z.string()
    })
    const form = useForm({
        resolver:zodResolver(schema),
        mode:"onChange"
    })
    const values = form.getValues()
    const MutateAddCard = useMutation({
        mutationFn:async()=>{
          console.log(values)
            const response = await axios.put(`http://13.201.137.42:3000/flashcard`,{
                id:props.id,
                title:form.getValues("title"),
                description:form.getValues("description")
            }, {
                headers:{
                    Authorization:token
                }
            })
            return response.data
        },
        onSettled:(data)=>{
            QueryClient.invalidateQueries({queryKey:["cards"]})
            console.log(data)
        }
    })
  return (
    <Form {...form}>
                <form onSubmit={form.handleSubmit(()=>{
                    console.log("submit")
                        MutateAddCard.mutate()
                    })} className="h-72 flex justify-around items-center flex-col w-full">
                    <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input className="w-80" placeholder="Question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Input className="w-80"  placeholder="Answer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"secondary"} disabled={MutateAddCard.isPending} type="submit">{(MutateAddCard.isPending)?"loading":"submit"}</Button>        
                    </form>
                </Form>
  );
}