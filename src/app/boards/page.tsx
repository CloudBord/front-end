import { auth } from "@/auth";
import { getBoards } from "@/hooks/useBoards";
import React, { useEffect, useState } from "react";

export default async function Boards() {
  const session = await auth();

  if(!session){
    return (
      <div>

      </div>
    )
  }

  const boards = await getBoards(session.token.accessToken!);

  if(session){
    return (
      <div className="flex justify-center">
        <div className="container">
          {session.user?.name}&apos;s boards
        </div>
      </div>
    );
  }
}
  