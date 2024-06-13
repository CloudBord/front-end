import { Board } from "@/types";

export const getBoard = async(id: number) : Promise<Board|null> => {
    try{
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/boards/${id}`, {
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