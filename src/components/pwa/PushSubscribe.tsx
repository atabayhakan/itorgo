"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n/LocaleProvider";

export function PushSubscribe() {
  const t = useT();
  const [status, setStatus] = useState<"idle" | "granted" | "denied">("idle");

  async function subscribe() {
    if (!("Notification" in window)) { setStatus("denied"); return; }
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      // TODO: POST /api/push/subscribe with PushSubscription
      setStatus("granted");
      new Notification("ITOrgo", { body: t("pwa.push_enabled_body") });
    } else setStatus("denied");
  }

  return (
    <div className="rounded-xl bg-surface-dim p-3">
      <p className="text-sm font-bold">{t("pwa.push_title")}</p>
      <p className="mt-1 text-xs text-ink-faint">{t("pwa.push_text")}</p>
      <button onClick={subscribe} className="btn-primary mt-2 !min-h-9 w-full !text-sm">
        {status === "granted" ? `✓ ${t("pwa.push_enabled")}` : status === "denied" ? t("pwa.push_blocked") : t("pwa.push_enable")}
      </button>
    </div>
  );
}
