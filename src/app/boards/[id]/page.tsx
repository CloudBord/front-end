"use client"
import TldrawWrapper from "@/components/TldrawWrapper";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import useSWR from 'swr';

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Board() {
  const params = useParams<{id: string}>();
  if(isNaN(+params.id)){
    redirect("/not-found");
  }
  
  const { data: session } = useSession();

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-74px)]">
          <TldrawWrapper boardId={params.id} />
      </div>
    </>
  );
}
  