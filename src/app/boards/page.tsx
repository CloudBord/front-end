import { auth } from "@/auth";
import { BoardCard } from "@/components/BoardCard";
import { getBoards } from "@/hooks/useBoards";

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
          <h1>{session.user?.name}&apos;s boards</h1>
          <div>
            {boards.map((board) => (
              <BoardCard key={board.id} board={board}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
  