"use client"
import TldrawWrapper from "@/components/TldrawWrapper";
import { useParams } from "next/navigation";

export default function Board() {
  const params = useParams<{id: string}>();

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-74px)]">
          <TldrawWrapper boardId={params.id} />
      </div>
    </>
  );
}
  