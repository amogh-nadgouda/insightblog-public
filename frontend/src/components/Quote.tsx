

import { useQuote } from "../hooks";
import { QuoteSkeleton } from "./QuoteSleleton";

export const Quote = ()=>{
  const {loading, quote, author} = useQuote();
 if(loading){
  return <div>
    <QuoteSkeleton />
  </div>
 }else{
  return <div className="bg-slate-50/75 h-screen flex justify-center flex-col">
    <div className="flex justify-center">
      <div className="max-w-lg  text-balance">
        <div className="text-3xl font-bold  ">
        "{quote}"
        </div>
       <div className="max-w-md  text-xl font-semibold mt-3">{author}</div>
      
      </div> 
      
      </div>
      
  </div>
 }}
