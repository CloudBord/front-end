import { Board } from "@/types";

export const getBoard = async(id: number) : Promise<Board|null> => {
    try{
        const res = await fetch(`${process.env.API_URL}/api/GetBoard/${id}`, {
            method: 'POST',
            next: {
                revalidate: 0
            }
        })

        if(!res.ok){
            throw new Error("Could not get whiteboard contents");
        }

        try{
            return res.json();
        }
        catch(error){
            return null;
        }
    }
    catch(error){
        console.error(error);
        return null;
    }
}