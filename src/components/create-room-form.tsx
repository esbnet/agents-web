import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

import { useCreateRoom } from "@/http/use-create-room";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const createRoomSchema = z.object({
    name: z.string().min(1, "O nome da sala é obrigatório"),
    description: z.string(),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
    const { mutateAsync: createRoom } = useCreateRoom();

    const createRoomForm = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            name: "",
            description: "",
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
        criteriaMode: "all",
        shouldFocusError: true,
    })

    async function handleCreateRoom({ name, description }: CreateRoomFormData) {
        try {
            await createRoom({
                name,
                description,
            });
            createRoomForm.reset();
            toast.success("Sala criada com sucesso!");
        } catch (error: any) {
            toast.error("Erro ao criar sala. Tente novamente.");
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Cariar sala
                </CardTitle>
                <CardDescription>
                    Creie uma nova sala para começar a fazer perguntas e receber respostas da I.A.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createRoomForm} >
                    <form onSubmit={createRoomForm.handleSubmit(handleCreateRoom)} className="flex flex-col gap-4">
                        <FormField
                            control={createRoomForm.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Nome da sala</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Digite o nome da sala..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                            }
                        />

                        <FormField
                            control={createRoomForm.control}
                            name="description"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <Button type="submit" className="">
                            Criar sala
                        </Button>
                    </form>
                </Form>
            </CardContent>

        </Card>
    )
}
