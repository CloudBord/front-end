import { TLStoreSnapshot } from "tldraw"

export const saveSnapshot = async(document: TLStoreSnapshot, boardId: number) : Promise<void> => {
    try{
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                boardId: boardId,
                document: document
            }),
            next: {
                revalidate: 0
            }
        })

        if(!res.ok){
            throw new Error("Could not store document");
        }
    }
    catch(error){
        console.error(error);
    }
}