import { useEditor } from "tldraw";
import { Button, ButtonProps } from "./ui/button";
import { saveSnapshot, getSnapshot } from "@/hooks/useSessions";

export default function BoardLoadButton({ boardId } : { boardId: string }){
	const editor = useEditor();

	const buttonProps: ButtonProps = {
		className: "absolute top-2 right-80 z-[200]"
	};

	return (
		<Button {...buttonProps} onClick={async() => {
			const snapshot = await getSnapshot(Number(boardId))
			if(!snapshot) return;
			editor.loadSnapshot(snapshot);
		}}>
			Load Work
		</Button>
	)
}