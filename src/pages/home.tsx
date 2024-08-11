import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import FlipCard from "@/components/cards/flip"
export default function HomePage(){
    const QueryFlashCards = useQuery({
        queryKey:["flashcards"],
        queryFn:async()=>{
            const response = await axios.get("http://localhost:3000/flashcard")
            return response.data
        }
    })
    if(QueryFlashCards.isLoading){
        return <div>Loading...</div>
    }
    if(QueryFlashCards.isError){
        return <div>Error{`${QueryFlashCards.error}`}</div>
    }
    if(QueryFlashCards.data){
    return (    
        <div className="flex flex-col items-center justify-center w-full h-screen" style={{ backgroundImage: "url('https://utfs.io/f/c1f3b2de-d101-4709-b5dc-db30c29487ef-qqbpro.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <Carousel
            opts={{
                loop:true,
            }}
            >
            <CarouselPrevious>Previous</CarouselPrevious>
                <CarouselContent >
                    {QueryFlashCards.data.message.map((flashcard:any)=>{
                        return (
                            <CarouselItem key={flashcard.id}>
                                <div className="flex justify-center items-center">
                                <FlipCard answer={flashcard.description} question={flashcard.title}></FlipCard>
                                </div>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselNext>Next</CarouselNext>
            </Carousel>
        </div>
    )
}
}