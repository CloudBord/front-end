import { auth } from "@/auth";
import { BoardCard } from "@/components/BoardCard";
import { BoardFormModal } from "@/components/BoardFormModal";
import { getBoards } from "@/hooks/useBoards";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";

export default async function Boards() {
  const session = await auth();

  if(!session){
    return (
      <div>
        Log in to view boards!
      </div>
    )
  }

  if(session){
    const boards = await getBoards(session.token.accessToken!);

    return (
      <div className="flex justify-center">
        <div className="container">
          <div className="flex flex-col justify-center items-center gap-2 py-3">
            <Label className="text-lg">No whiteboard? Click the button to create one!</Label>
            <BoardFormModal />
          </div>
          <Separator className="my-4" />
          <Label className="text-lg">Your current boards:</Label>
          <div className="flex flex-col gap-4">
            {boards.map((board) => (
              <BoardCard key={board.id} board={board}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
  