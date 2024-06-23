import { Board, Result } from "@/types";

export const getBoard = async(id: number) : Promise<Board | null> => {
    try{
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/boards/${id}`, {
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
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/boards`, {
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

export const createBoard = async(title: string, token: string) : Promise<Response | undefined> => {
    try{
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/boards`, {
            method: 'POST',
            body: JSON.stringify({ title: title }),
            headers: {
                
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        
        if(!res.ok){
            throw new Error("Could not create whiteboard");
        }
        return res;
    }
    catch(error){
        console.error(error);
    }
}

export const deleteBoard = async(boardId: number, token: string) : Promise<Result | undefined> => {
    try{
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/boards/${boardId}`, {
            method: 'DELETE',
            body: JSON.stringify({ boardId: boardId }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        
        if(!res.ok){
            throw new Error("Could not delete whiteboard");
        }

        return res.json();
    }
    catch(error){
        console.error(error);
    }
}