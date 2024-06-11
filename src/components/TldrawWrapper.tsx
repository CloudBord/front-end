// import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

import { useEditor, Editor } from "tldraw";
import { getBoard } from "@/hooks/useBoards";

import { useSocketStore } from '@/hooks/useSocketStore';
import dynamic from 'next/dynamic';

const Tldraw = dynamic(async () => (await import('tldraw')).Tldraw, { ssr: false});

export default function TldrawWrapper({ boardId } : {boardId: string }) {
	const store = useSocketStore({
		hostUrl: `${process.env.NEXT_PUBLIC_SOCKET_URL}`,
		roomId: boardId
	})

	const editor = useEditor();

	return (
		<Tldraw
			autoFocus
			store={store}
			// onMount={(editor) => {
			// 	const unlisten = editor.store.listen(
			// 		(update) => {
			// 			console.log('update', update)
			// 		},
			// 		{ scope: 'document', source: 'user' }
			// 	)
			// }}
		/>
	)
}