"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage
} from "@/components/ui/form";
import { Plus } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { createBoard } from "@/hooks/useBoards";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
  })

export function BoardFormModal() {
    const { data: session } = useSession();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })
      
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            const res = await createBoard(values.title, session?.token.accessToken as string);
            if(res){
                form.reset();
                location.reload();
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#20ae38]">
                    Create New Whiteboard<Plus className="ml-2" color="#ffffff" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new whiteboard</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Whiteboard Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Whiteboard" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the title of your whiteboard.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}