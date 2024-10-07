"use client"
import TldrawWrapper from "@/components/TldrawWrapper";
import { redirect, useParams } from "next/navigation";

export default function Board() {
  const params = useParams<{id: string}>();
  if(isNaN(+params.id)){
    redirect("/not-found");
  }

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-74px)]">
          <TldrawWrapper boardId={params.id} />
      </div>
    </>
  );
}
  