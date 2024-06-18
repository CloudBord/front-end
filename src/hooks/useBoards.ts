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

        return res.json();
    }
    catch(error){
        console.error(error);
        return null;
    }
}


export const getBoards = async(token: string) : Promise<Board[]> => {
    try{
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/boards`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            next: {
                revalidate: 0
            }
        })

        if(!res.ok){
            throw new Error("Could not get whiteboard contents");
        }

        const boards: Board[] = await res.json();
        return boards;
    }
    catch(error){
        console.error(error);
        return [];
    }
}