import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

import { useRooms } from "@/http/use-rooms";
import { formatTimeToNow } from "@/lib/format-relative-date";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

export function RoomList() {

    const { data, isLoading } = useRooms();

    return (
        <Card >
            <CardHeader>
                <CardTitle>
                    Salas recentes
                </CardTitle>
                <CardDescription>
                    Acesso rápido às salas que você criou recentemente.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {isLoading ? (
                    <p className="text-muted-foreground text-sm">Carregando...</p>
                ) : (
                    data?.map((room) => (
                        <Link to={`/room/${room.id}`} key={room.id} className="flex items-center hover:bg-accent/50 p-3 border rounded-lg transition-colors duration-300">
                            <div className="flex flex-col flex-1 gap-1">
                                <h3 className="font-medium">{room.
                                    name}</h3>
                                <div className="flex gap-2 w-full text-muted-foreground text-xs">
                                    <Badge variant={"secondary"} className="font-thin text-xs">
                                        {room.questionCount} perguntas
                                    </Badge>
                                    <Badge variant={"secondary"} className="font-thin text-xs">
                                        {formatTimeToNow(new Date(room.createdAt))}
                                    </Badge>
                                </div>
                            </div>
                            <span className="flex items-center gap-1 text-xs">
                                Entrar
                                <ArrowRight size={12} />
                            </span>
                        </Link>
                    ))
                )}
            </CardContent>
        </Card>)
}