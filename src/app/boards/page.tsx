import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Boards() {
  const session = await getServerSession(authOptions);
  if(session){
    return (
      <div className="flex justify-center">
        <div className="container">
          Cool boards
        </div>
      </div>
    );
  }
}
  