"use client";

import { useState } from "react";
import Link from "next/link";
import { IconBack } from "@/components/icons/Icons";

const INITIAL = [
  { id: "m1", mine: false, text: "Здравствуйте, товар ещё доступен?" },
  { id: "m2", mine: true, text: "Да, доступен. Город Бишкек, доставка 300 сом." },
  { id: "m3", mine: false, text: "Можно встретиться сегодня?" },
];

export function ThreadChat({ threadId }: { threadId: string }) {
  const [msgs, setMsgs] = useState(INITIAL);
  const [text, setText] = useState("");

  function send() {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { id: `m${Date.now()}`, mine: true, text: text.trim() }]);
    setText("");
  }

  return (
    <main className="flex h-[calc(100dvh-72px)] flex-col lg:h-[600px]">
      <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-2">
        <Link href="/messages" className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-dim">
          <IconBack size={16} />
        </Link>
        <span className="text-sm font-bold">Чат · {threadId}</span>
      </div>
      <div className="flex-1 space-y-2 overflow-auto p-4">
        {msgs.map((m) => (
          <div key={m.id} className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.mine ? "ml-auto bg-brand-600 text-white" : "bg-surface shadow-card"}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="border-t border-line bg-surface p-3">
        <div className="flex gap-2">
          <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Сообщение…" className="flex-1 rounded-full border border-line bg-surface-dim px-4 py-2.5 text-sm" />
          <button onClick={send} className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white">Отправить</button>
        </div>
        <p className="mt-1 text-center text-xs text-ink-faint">TODO: WS · POST /api/messages · Message model</p>
      </div>
    </main>
  );
}
