'use client'

import { getBoard } from '@/lib/useBoards';
import { ReactNode } from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

export default function TldrawWrapper({children } : { children: ReactNode }) {
    const persistenceKey = "whiteboard-contents";

	return (
		<Tldraw
			autoFocus
		>
		{children}
		</Tldraw>
	)
}