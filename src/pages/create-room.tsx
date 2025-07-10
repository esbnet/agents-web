import { CreateRoomForm } from "@/components/create-room-form";
import { RoomList } from "@/components/room-list";

export function CreateRoom() {

    return (
        <div className="py-8 w-full min-h-screen">
            <div className="mx-auto px-4 max-w-4xl">
                <div className="items-start gap-8 grid grid-cols-2">
                    <CreateRoomForm />
                    <RoomList />
                </div>
            </div>
        </div >
    );
}
