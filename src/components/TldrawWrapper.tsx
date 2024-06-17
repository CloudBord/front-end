
import { useEditor } from "tldraw";
import { getBoard } from "@/hooks/useBoards";

import { useSocketStore } from '@/hooks/useSocketStore';
import dynamic from 'next/dynamic';
import 'tldraw/tldraw.css';

const Tldraw = dynamic(async () => (await import('tldraw')).Tldraw, { ssr: false});

export default function TldrawWrapper({ boardId } : {boardId: string }) {
	const store = useSocketStore({
		hostUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
		roomId: boardId
	})

	const editor = useEditor();

	return (
		<Tldraw
			autoFocus
			store={store}
		/>
	)
}