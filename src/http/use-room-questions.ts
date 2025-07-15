import { useQuery } from "@tanstack/react-query";
import type { QuestionProps } from "./types/question";

const API_URL = import.meta.env.VITE_API_URL

export function useRoomQuestions(roomId: string) {

    return useQuery({
        queryKey: ["get-questions", roomId],

        queryFn: async () => {
            const response = await fetch(`${API_URL}/rooms/${roomId}/questions`)
            const result: QuestionProps[] = await response.json();
            return result
        }        
    });
}