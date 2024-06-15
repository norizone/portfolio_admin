'use client'
import { ReactNode } from "react";


type Props ={
  children:ReactNode,
  link?:string,
  onEdit?:() => void;
  onDelete?:()=>void;
}

export const ListCard =(props:Props)=>{
  const {children,link,onEdit,onDelete} = props
  return(
    <li className="bg-white hover:bg-hover transition-all shadow-sm rounded-md p-[1em]">
      <span>{children}</span>
    </li>
  )
}