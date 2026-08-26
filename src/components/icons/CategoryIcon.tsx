// ITOrgo category iconography — Lucide-style stroke SVGs. No emoji in design language.
type P = { size?: number; className?: string; strokeWidth?: number };

function S({ size = 18, className = "", strokeWidth = 1.8, children }: P & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {children}
    </svg>
  );
}

export const CatPhone = (p: P) => <S {...p}><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></S>;
export const CatCar = (p: P) => <S {...p}><path d="M5 17h14l-1.5-5.5a2 2 0 0 0-1.9-1.5H8.4a2 2 0 0 0-1.9 1.5L5 17Z" /><path d="M4 17h16v3h-2.5l-.5-1.5H7L6.5 20H4v-3Z" /><path d="M7.5 13.5h9" /></S>;
export const CatHome = (p: P) => <S {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9v11h13V9" /><path d="M10 20v-5.5h4V20" /></S>;
export const CatShirt = (p: P) => <S {...p}><path d="M8 4 4 7l2 3.5L8 9v11h8V9l2 1.5L20 7l-4-3a4 4 0 0 1-8 0Z" /></S>;
export const CatSparkles = (p: P) => <S {...p}><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z" /><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" /></S>;
export const CatSofa = (p: P) => <S {...p}><path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" /><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4Z" /><path d="M6 19v2M18 19v2" /></S>;
export const CatPaw = (p: P) => <S {...p}><circle cx="7" cy="9" r="1.6" /><circle cx="12" cy="7" r="1.6" /><circle cx="17" cy="9" r="1.6" /><path d="M12 12c-2.6 0-4.5 2-4.5 4.2 0 1.6 1.2 2.8 2.7 2.8 1 0 1.3-.4 1.8-.4s.8.4 1.8.4c1.5 0 2.7-1.2 2.7-2.8 0-2.2-1.9-4.2-4.5-4.2Z" /></S>;
export const CatWheat = (p: P) => <S {...p}><path d="M12 21V9" /><path d="M12 9c0-3 1.5-5 4-6-.5 3-1.5 5-4 6Z" /><path d="M12 9C12 6 10.5 4 8 3c.5 3 1.5 5 4 6Z" /><path d="M12 15c0-3 1.5-5 4-6-.5 3-1.5 5-4 6Z" /><path d="M12 15c0-3-1.5-5-4-6 .5 3 1.5 5 4 6Z" /></S>;
export const CatWrench = (p: P) => <S {...p}><path d="M14.7 6.3a4.5 4.5 0 0 0-6 5.6L3 17.6V21h3.4l5.7-5.7a4.5 4.5 0 0 0 5.6-6L14.5 12l-2.5-2.5 2.7-3.2Z" /></S>;
export const CatHelmet = (p: P) => <S {...p}><path d="M4 16a8 8 0 0 1 16 0" /><path d="M2.5 16h19v2a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-2Z" /><path d="M10 8.5V5a2 2 0 0 1 4 0v3.5" /></S>;
export const CatWatch = (p: P) => <S {...p}><circle cx="12" cy="12" r="5.5" /><path d="M9 7 8.5 3h7L15 7M9 17l-.5 4h7L15 17" /><path d="M12 10v2.3l1.6 1" /></S>;
export const CatGem = (p: P) => <S {...p}><path d="M7 3h10l4 6-9 12L3 9l4-6Z" /><path d="M3 9h18M9.5 3 8 9l4 12 4-12-1.5-6" /></S>;
export const CatGamepad = (p: P) => <S {...p}><path d="M6 8h12a4 4 0 0 1 4 4.5c-.3 3-1.2 6.5-3 6.5-1.6 0-2-2-4-2h-6c-2 0-2.4 2-4 2-1.8 0-2.7-3.5-3-6.5A4 4 0 0 1 6 8Z" /><path d="M8 11v3M6.5 12.5h3" /><circle cx="16" cy="11.5" r="0.6" fill="currentColor" /><circle cx="18" cy="13.5" r="0.6" fill="currentColor" /></S>;
export const CatBook = (p: P) => <S {...p}><path d="M12 6c-1.5-1.5-3.5-2-6-2H4v14h2c2.5 0 4.5.5 6 2 1.5-1.5 3.5-2 6-2h2V4h-2c-2.5 0-4.5.5-6 2Z" /><path d="M12 6v14" /></S>;
export const CatDumbbell = (p: P) => <S {...p}><path d="M6.5 6.5v11M4 9v6M17.5 6.5v11M20 9v6M6.5 12h11" /></S>;
export const CatPalette = (p: P) => <S {...p}><path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-.9 2-1.8 0-1.4-1.2-1.7-1.2-2.9 0-1 .8-1.8 2-1.8h1.7A4.5 4.5 0 0 0 21 10c-.4-4-4.3-7-9-7Z" /><circle cx="7.5" cy="11" r="0.7" fill="currentColor" /><circle cx="11" cy="7.5" r="0.7" fill="currentColor" /><circle cx="15.5" cy="8.5" r="0.7" fill="currentColor" /></S>;

export function CategoryIcon({ id, size = 18, className = "", strokeWidth = 1.8 }: P & { id: string }) {
  const map: Record<string, (p: P) => React.ReactNode> = {
    electronics: CatPhone, auto: CatCar, realty: CatHome, clothes: CatShirt,
    beauty: CatSparkles, home: CatSofa, animals: CatPaw, farm: CatWheat,
    services: CatWrench, construction: CatHelmet, watches: CatWatch,
    jewelry: CatGem, games: CatGamepad, books: CatBook, sport: CatDumbbell,
    collectibles: CatPalette,
  };
  const Icon = map[id] ?? CatPalette;
  return <>{Icon({ size, className, strokeWidth })}</>;
}
