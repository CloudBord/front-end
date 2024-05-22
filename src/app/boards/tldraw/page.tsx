import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { getBoardById } from "@/lib/useBoards";
import React from "react";
import { useEditor } from "tldraw";
import TldrawWrapper from "@/components/TldrawWrapper";

const SaveButton = () => {
  const editor = useEditor();
  return (
    // <button onClick={() => {
    //   const snapshot = editor.store.getSnapshot();
    //   const stringified = JSON.stringify(snapshot);
    //   console.log(stringified);
    // }}>
    //   Save
    // </button>

    <button
      style={{
        position: 'absolute',
        top: 10,
        right: 165,
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#FFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: 1000,
      }}
      onClick={async() =>{
        const snapshot = editor.store.getSnapshot();
        const stringified = JSON.stringify(snapshot);
        console.log(stringified);
        const response = await getBoardById(uuidv4() as UUID);
        console.log(response);
      }}
    >
      Save
    </button>

  )
}

export default function Board() {
  const editor = useEditor();
    return (
      <>
        <div className="flex flex-col h-screen">
            <TldrawWrapper>
              <SaveButton />
            </TldrawWrapper>
        </div>
      </>
    );
  }
  