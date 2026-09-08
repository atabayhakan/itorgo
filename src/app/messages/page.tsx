import Link from "next/link";
import { Avatar } from "@/components/ui/ProductImage";
import { getT } from "@/lib/i18n/server";

const THREADS = [
  { id: "t1", with: "Азамат Т.", last: "Здравствуйте, товар ещё доступен?", time: "10:24", unread: 2 },
  { id: "t2", with: "TechMarket KG", last: "Спасибо за покупку!", time: "вчера", unread: 0 },
  { id: "t3", with: "Гульмира Ж.", last: "Можно скидку?", time: "09:14", unread: 1 },
];

export default async function MessagesPage() {
  const t = await getT();
  return (
    <main className="px-4 py-4">
      <h1 className="text-lg font-extrabold">{t("nav.messages")}</h1>
      <ul className="mt-4 space-y-2">
        {THREADS.map((th) => (
          <li key={th.id}>
            <Link href={`/messages/${th.id}`} className="flex items-center gap-3 rounded-2xl bg-surface px-3 py-3 shadow-card">
              <Avatar name={th.with} size={40} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  {th.with} {th.unread > 0 && <span className="rounded-full bg-danger px-1.5 py-0.5 text-xs font-bold text-white">{th.unread}</span>}
                </p>
                <p className="truncate text-xs text-ink-faint">{th.last}</p>
              </div>
              <span className="text-xs text-ink-faint">{th.time}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
