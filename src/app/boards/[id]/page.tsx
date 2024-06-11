"use client"
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Message } from "@/types";
import { getConnectionInfo, joinGroup, sendToGroup } from "@/lib/useSignalR";

// import { useEditor } from "tldraw";
// import { getBoard } from "@/lib/useBoards";
// import TldrawWrapper from "@/components/TldrawWrapper";

// const SaveButton = () => {
//   const editor = useEditor();
  
//   const saveBoard = async () => {
//     const snapshot = editor.store.getSnapshot();
//     const stringified = JSON.stringify(snapshot);
//     console.log(stringified);
//     const response = await getBoard(1);
//     console.log(response);
    
//   }

//   return (
//     <button
//       style={{
//         position: 'absolute',
//         top: 10,
//         right: 165,
//         padding: '10px 20px',
//         backgroundColor: '#007BFF',
//         color: '#FFF',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//         zIndex: 1000,
//       }}
//       onClick={saveBoard}
//     >
//       Save
//     </button>
//   )
// }



const Board = () => {
  const params = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    getConnectionInfo(1).then(res => {
      console.log(res);
      if(!res){
        throw new Error();
      }

      const connect = new HubConnectionBuilder()
        .withUrl(res.Url, {
          accessTokenFactory: () => res.AccessToken
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      setConnection(connect);
      
      connect.start().then(() => {
        connect.on("newMessage", onNewMessage);
        connect.onclose(() => console.log("disconnected"));
        
        connect.invoke("JoinGroup", connect.connectionId ,`board-${params.id}`).then(res => {
          if(!res.ok){
            throw new Error("Failed to join group");
          }
        });
      });
    });
  }, []);

  function onNewMessage(message: Message){
    setMessages([...messages, message]);
  }

  const sendMessage = async() => {
    console.log("sending...");
    sendToGroup(connection, params.id, newMessage);
  }

  const isMyMessage = (username: string) => {
    return connection && username === connection.connectionId;
  };
  
  return (
    <div className="p-4">
      <div className="mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded ${
              isMyMessage(msg.sender) ? "bg-blue-200" : "bg-gray-200"
            }`}
          >
            <p>{msg.content}</p>
            <p className="text-xs">
              {new Date(msg.sentTime).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className="d-flex justify-row">
        <input
          type="text"
          className="border p-2 mr-2 rounded w-[300px]"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}
export default Board;

// export default function Board() {
//   return (
//     <>
//       <div className="flex flex-col h-screen">
//           <TldrawWrapper>
//             <SaveButton />
//           </TldrawWrapper>
//       </div>
//     </>
//   );
// }
  