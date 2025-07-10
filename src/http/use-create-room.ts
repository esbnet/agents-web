import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { RoomProps } from "./types/room";

const API_URL = import.meta.env.VITE_API_URL

export function useCreateRoom() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ( data:  Omit<RoomProps, "id"| "createdAt" | "questionCount">  ) => {
            const response = await fetch(`${API_URL}/rooms"`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),                
            })            

            if (!response.ok) {
                throw new Error("Failed to create room");
            }
            return await response.json() as Pick<RoomProps, "id">;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-rooms"]
            });
        }
    });
}
