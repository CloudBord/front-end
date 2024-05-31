import { auth } from "@/auth";
import React from "react";

export default async function Boards() {
  const session = await auth();
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
  