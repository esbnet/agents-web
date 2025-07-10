import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { QuestionProps } from "./types/question";

const API_URL = import.meta.env.VITE_API_URL

export function useCreateQuestion(roomId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ( data :  Pick<QuestionProps, "question">  ) => {
            const response = await fetch(`${API_URL}/rooms/${roomId}/questions`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),                
            })            

            if (!response.ok) {
                throw new Error("Failed to create question");
            }
            return await response.json() as Pick<QuestionProps, "id">;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-questions", roomId]
            });

        }
    });
}
