import { useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function FlipCard(
    props:{
        question:string,
        answer:string,
    }
){
    const [flipped, setFlipped] = useState(false)
    return <ReactCardFlip  isFlipped={flipped} flipDirection="horizontal">
    <div onClick={()=>{
        setFlipped(true)
    }} className="h-80 md:w-80 w-40 flex rounded-lg backdrop-blur-md text-white bg-white/30 shadow-sm justify-center items-center">
        {props.question}
    </div>
    <div onClick={()=>{
        setFlipped(false)
    }} className="h-80 w-40 flex rounded-lg backdrop-blur-md text-white bg-white/10 shadow-sm justify-center items-center" >
        {props.answer}
    </div>
    </ReactCardFlip>
}