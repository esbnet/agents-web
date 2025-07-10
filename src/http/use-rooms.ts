import type { RoomProps } from "./types/room";
import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL

export function useRooms() {

    return useQuery({
        queryKey: ["get-rooms"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/rooms`)
            const result: RoomProps[] = await response.json();
            return result
        }
    });
}
