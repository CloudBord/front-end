
import { useState } from "react";
import dynamic from 'next/dynamic';
import 'tldraw/tldraw.css';

import { useSocketStore } from '@/hooks/useSocketStore';
import BoardSaveButton from "./BoardSaveButton";

const Tldraw = dynamic(async () => (await import('tldraw')).Tldraw, { ssr: false });

export default function TldrawWrapper({ boardId } : { boardId: string }) {
	const [snapshot, setSnapshot] = useState(null);

	const store = useSocketStore({
		boardId: boardId,
		url: `${process.env.NEXT_PUBLIC_API_URL}`
	})

	return (
		<>
			<Tldraw
				autoFocus
				store={store}
			>
				<BoardSaveButton boardId={boardId}/>
			</Tldraw>
		</>
	)
}