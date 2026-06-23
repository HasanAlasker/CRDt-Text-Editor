import React from "react";

const StatusMap = {
  1: { label: "Online", className: "bg-green-400" },
  0: { label: "Offline", className: "bg-red-500" },
};

export default function StatusBadge({ connected }: { connected: boolean }) {
  const { label, className } = StatusMap[connected ? 1 : 0];
  return (
    <div className="flex items-center space-x-3 label">
      <div className={`flex rounded-full w-3 aspect-square ${className}`} />
      <div>{label}</div>
    </div>
  );
}
