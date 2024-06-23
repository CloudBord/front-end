import { getSnapshot, useEditor } from "tldraw";
import { Button, ButtonProps } from "./ui/button";
import { saveSnapshot } from "@/hooks/useSessions";

export default function BoardSaveButton({ boardId } : { boardId: string }){
	const editor = useEditor();

	const buttonProps: ButtonProps = {
		className: "absolute top-2 right-44 z-[200]"
	};

	return (
		<Button {...buttonProps} onClick={async() => {
			const { document } = getSnapshot(editor.store);
			await saveSnapshot(document, Number(boardId))
		}}>
			Save Work
		</Button>
	)
}