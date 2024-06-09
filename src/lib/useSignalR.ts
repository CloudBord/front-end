import { HubConnection } from "@microsoft/signalr";
import { ConnectionInfo } from "@/types";

export const getConnectionInfo = async(userId: number): Promise<ConnectionInfo | null> => {
    try{
        const res = await fetch(
            `http://localhost:7222/api/negotiate?userId=${userId}`,
            {
                method: 'POST'
            }
        );
        if(!res.ok){
            console.log(res);
            throw new Error("Could not connect! Check the logs!");
        }
        const data = await res.json();
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

export const joinGroup = async(connection: HubConnection | null, boardId:String) => {
    try{
        if(connection){
            const res = await connection.invoke("JoinGroup", connection.connectionId ,`board-${boardId}`);
            if(!res.ok){
                throw new Error("Failed to join group");
            }
        }
    }
    catch(error){
        console.log(error);
        return null;
    }
}

export const sendToGroup = async(connection: HubConnection | null, boardId:String, messsage: String) => {
    if (connection && messsage.trim()) {
        const res = await connection.invoke("SendToGroup", `board-${boardId}`, messsage);
        if(!res.ok){
            throw new Error("Failed to send to group");
        }
        console.log(res);
    }
}