import { Board } from "@/types";
import { UUID } from "crypto";
import env from "./environment";

export const getBoardById = async(id: UUID) : Promise<Board|null> => {
    try{
        console.log(env.API_URL)
        const res = await fetch(`${env.API_URL}/GetBoardById`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({boardId: id})
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