import { Board } from "@/types";
import { UUID } from "crypto";

export const getBoardById = async(boardId: UUID) : Promise<Board|null> => {
    try{
        const res = await fetch(`${process.env.API_URL}`)
        if(!res.ok){
            throw new Error("Could not get whiteboard contents");
        }
        return await res.json();
    }
    catch(error){
        console.error(error);
        return null;
    }
}