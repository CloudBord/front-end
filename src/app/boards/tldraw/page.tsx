'use client'

import React from "react";
import { Editor, Tldraw, useEditor } from "tldraw";
import 'tldraw/tldraw.css';

const SaveButton = () => {
  const editor = useEditor();
  return (
    <button onClick={() => {
      const snapshot = editor.store.getSnapshot();
      const stringified = JSON.stringify(snapshot);
      console.log(stringified);
    }}>
      Save
    </button>
  )
}

export default function Board() {
  const editor = useEditor();
    return (
      <>
        <div className="flex flex-col h-screen">
            <Tldraw persistenceKey="banana">
              <SaveButton />
            </Tldraw>
        </div>
      </>
    );
  }
  