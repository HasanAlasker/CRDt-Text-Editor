"use client";
import { useRouter } from "next/navigation";
import Button from "./components/Button";
import RoomBox from "./components/RoomBox";

export default function Home() {
  const router = useRouter();

  const createRoom = () => {
    const uuid = crypto.randomUUID();
    router.push(`/room/${uuid}`);
  };

  return (
    <div className="flex flex-col space-y-15">
      <Button
        title="Private Room"
        icon="plus"
        style="pri"
        onclick={createRoom}
      />

      <section className="border border-outline px-4 py-6 rounded-md bg-card">
        <h1>Public rooms</h1>
        <div className="flex flex-col space-y-2 ">
          <RoomBox name="Room 1" id="publicRoom1" />
          <RoomBox name="Room 2" id="publicRoom2" />
          <RoomBox name="Room 3" id="publicRoom3" />
          <RoomBox name="Room 4" id="publicRoom4" />
          <RoomBox name="Room 5" id="publicRoom5" />
        </div>
      </section>
    </div>
  );
}
