import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { getBoard } from "@/lib/useBoards";
import React from "react";
import { useEditor } from "tldraw";
import TldrawWrapper from "@/components/TldrawWrapper";

const SaveButton = () => {
  const editor = useEditor();
  
  const saveBoard = async () => {
    const snapshot = editor.store.getSnapshot();
    const stringified = JSON.stringify(snapshot);
    console.log(stringified);
    const response = await getBoard(1);
    console.log(response);
  }

  return (
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
      onClick={saveBoard}
    >
      Save
    </button>
  )
}

export default async function Board() {
  const session = await getServerSession(authOptions)
  if(session){
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
}
  