"use client";
import "easymde/dist/easymde.min.css";
import { useEffect, useRef, useState } from "react";
import Button from "@/app/components/Button";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { applyDiff } from "@/app/functions/typeDif";
import { useRoomStore } from "@/app/store/useRoomStore";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function page() {
  const params = useParams();
  const roomId = params.id as string;

  const initRoom = useRoomStore((state) => state.initRoom);
  const destroyRoom = useRoomStore((state) => state.destroyRoom);
  const ytext = useRoomStore((state) => state.ytext);

  const [text, setText] = useState("");
  const isLocalChange = useRef(false);

  useEffect(() => {
    initRoom(roomId);
    return () => destroyRoom();
  }, [roomId]);

  useEffect(() => {
    if (!ytext) return;
    setText(ytext.toString());

    const observer = () => {
      // if i made the change, don't re render (prevents infinite loop)
      if (isLocalChange.current) return;
      setText(ytext.toString());
    };

    ytext.observe(observer);

    return () => {
      ytext.unobserve(observer);
    };
  }, [ytext]);

  const handleTyping = (newValue: string) => {
    if (!ytext) return;
    isLocalChange.current = true;
    setText(newValue);
    ytext.doc?.transact(() => applyDiff(ytext, newValue));
    isLocalChange.current = false;
  };

  const copyRoomURL = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Room URL copied to clipboard!");
  };

  return (
    <section>
      <div className="flex space-x-3 justify-between">
        <Button
          title="Copy URL"
          icon="link"
          style="sec"
          onclick={copyRoomURL}
        />
        <Link href={"/"}>
          <Button title="Leave Room" icon="log-out" style="red" />
        </Link>
      </div>
      <SimpleMDE value={text} onChange={handleTyping} />

      {/* <div className="block md:flex space-x-5">
        <div className="prose flex flex-1 max-w-full bg-card rounded-md border border-outline p-5 ">
          <Markdown remarkPlugins={[remarkBreaks]}>{text}</Markdown>
        </div>
      </div> */}
    </section>
  );
}
