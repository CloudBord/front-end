import { Board } from "@/types";
import env from "./environment";

export const getBoard = async(id: number) : Promise<Board|null> => {
    try{
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/GetBoard/${id}`, {
            method: 'POST',
            mode: "no-cors"
        })
        if(!res.ok){
            console.log(res);
            throw new Error("Could not get whiteboard contents");
        }
        return await res.json();
    }
    catch(error){
        console.error(error);
        return null;
    }
}