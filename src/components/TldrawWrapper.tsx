'use client'

import { Editor, Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

export default function TldrawWrapper({children}) {
    return (
        <Tldraw>
            {children}
        </Tldraw>
    )
}