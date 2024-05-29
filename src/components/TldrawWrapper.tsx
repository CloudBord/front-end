'use client'

import { ReactNode } from 'react';
import { Editor, Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

export default function TldrawWrapper({children} : { children: ReactNode }) {
    return (
        <Tldraw>
            {children}
        </Tldraw>
    )
}