"use client";
import LiveBadge from "../components/LiveBadge";
import StatusBadge from "../components/StatusBadge";
import { useRoomStore } from "../store/useRoomStore";

export default function TopBar() {
  const { connected, liveNum } = useRoomStore();
  return (
    <div className="flex justify-between py-5">
      <LiveBadge liveNum={liveNum} />
      <StatusBadge connected={connected} />
    </div>
  );
}
