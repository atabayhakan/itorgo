import Link from "next/link";
import { Avatar } from "@/components/ui/ProductImage";

const THREADS = [
  { id: "t1", with: "Азамат Т.", last: "Здравствуйте, товар ещё доступен?", time: "10:24", unread: 2 },
  { id: "t2", with: "TechMarket KG", last: "Спасибо за покупку!", time: "вчера", unread: 0 },
  { id: "t3", with: "Гульмира Ж.", last: "Можно скидку?", time: "09:14", unread: 1 },
];

export default function MessagesPage() {
  return (
    <main className="px-4 py-4">
      <h1 className="text-lg font-extrabold">Сообщения</h1>
      <p className="text-xs text-ink-faint">Spec Message model · threads · TODO: WS realtime</p>
      <ul className="mt-4 space-y-2">
        {THREADS.map((t) => (
          <li key={t.id}>
            <Link href={`/messages/${t.id}`} className="flex items-center gap-3 rounded-2xl bg-surface px-3 py-3 shadow-card">
              <Avatar name={t.with} size={40} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  {t.with} {t.unread > 0 && <span className="rounded-full bg-danger px-1.5 py-0.5 text-xs font-bold text-white">{t.unread}</span>}
                </p>
                <p className="truncate text-xs text-ink-faint">{t.last}</p>
              </div>
              <span className="text-xs text-ink-faint">{t.time}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
