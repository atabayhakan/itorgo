"use client";

import { useState } from "react";

export function PushSubscribe() {
  const [status, setStatus] = useState<"idle" | "granted" | "denied">("idle");

  async function subscribe() {
    if (!("Notification" in window)) { setStatus("denied"); return; }
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      // TODO: POST /api/push/subscribe with PushSubscription
      setStatus("granted");
      new Notification("ITOrgo", { body: "Push-уведомления включены — аукционы и доставка" });
    } else setStatus("denied");
  }

  return (
    <div className="rounded-xl bg-surface-dim p-3">
      <p className="text-sm font-bold">Push-уведомления</p>
      <p className="mt-1 text-xs text-ink-faint">Аукционы, ставки, доставка — PWA push (spec #56)</p>
      <button onClick={subscribe} className="btn-primary mt-2 !min-h-9 w-full !text-sm">
        {status === "granted" ? "✓ Включены" : status === "denied" ? "Заблокированы" : "Включить push"}
      </button>
      <p className="mt-1 text-center text-xs text-ink-faint">TODO: VAPID + /api/push/subscribe + SW push event</p>
    </div>
  );
}
