// Minimal custom icon set (stroke-based, consistent 24px grid).
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 22, children, ...rest }: P & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {children}
    </svg>
  );
}

export const IconSearch = (p: P) => (
  <Base {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Base>
);
export const IconBell = (p: P) => (
  <Base {...p}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></Base>
);
export const IconHeart = ({ filled, ...p }: P & { filled?: boolean }) => (
  <Base {...p} fill={filled ? "currentColor" : "none"}>
    <path d="M19 14c1.5-1.4 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3.4 1-4.5 2.5C10.9 4 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.1 3 5.5l7 6.6Z" />
  </Base>
);
export const IconHome = (p: P) => (
  <Base {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h5v-6h4v6h5V9.5" /></Base>
);
export const IconGavel = (p: P) => (
  <Base {...p}><path d="m14 4 6 6" /><path d="M11 7l6 6" /><path d="M16 2l6 6-2.5 2.5L13.5 4.5Z" /><path d="m12 9-8.5 8.5a2.1 2.1 0 0 0 3 3L15 12" /><path d="M3 22h8" /></Base>
);
export const IconBolt = (p: P) => (
  <Base {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></Base>
);
export const IconUser = (p: P) => (
  <Base {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></Base>
);
export const IconShare = (p: P) => (
  <Base {...p}><path d="M12 3v12" /><path d="m8 7 4-4 4 4" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" /></Base>
);
export const IconBack = (p: P) => (<Base {...p}><path d="m15 5-7 7 7 7" /></Base>);
export const IconChevron = (p: P) => (<Base {...p}><path d="m9 5 7 7-7 7" /></Base>);
export const IconPlus = (p: P) => (<Base {...p}><path d="M12 5v14M5 12h14" /></Base>);
export const IconStar = ({ filled, ...p }: P & { filled?: boolean }) => (
  <Base {...p} fill={filled ? "#f59e0b" : "none"} stroke={filled ? "#f59e0b" : "currentColor"}>
    <path d="m12 3 2.7 5.6 6.3.8-4.6 4.3 1.1 6.1L12 17l-5.5 2.8 1.1-6.1L3 9.4l6.3-.8L12 3Z" />
  </Base>
);
export const IconShield = (p: P) => (
  <Base {...p}><path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z" /><path d="m9 12 2 2 4-4" /></Base>
);
export const IconStore = (p: P) => (
  <Base {...p}><path d="M4 7 6 3h12l2 4" /><path d="M4 7h16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" /><path d="M6 12v9h12v-9" /><path d="M10 21v-5h4v5" /></Base>
);
export const IconClock = (p: P) => (
  <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></Base>
);
export const IconFire = (p: P) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M12.5 2c.6 3-1.5 4.6-2.9 6C8 9.6 6.5 11.4 6.5 14a5.5 5.5 0 0 0 11 .3c.9-3-.6-5.4-2-7.3C14 5 13.2 3.5 12.5 2Zm-4.3 9.6C7 13.2 6.6 15 7.3 16.8A6.9 6.9 0 0 0 12 21.7a6.9 6.9 0 0 1-3.8-10.1Z" />
  </Base>
);
export const IconVerified = (p: P) => (
  <svg viewBox="0 0 24 24" width={p.size ?? 18} height={p.size ?? 18} aria-hidden>
    <path fill="#2563eb" d="M12 1.5 15 4l3.8-.4.8 3.7 3.4 2-1.6 3.5 1.6 3.4-3.4 2-.8 3.8-3.7-.5L12 23l-3.1-2.5-3.8.4-.7-3.7-3.4-2L2.6 11 1 7.5l3.4-2 .8-3.7L9 4Z" transform="translate(1.2 -1)" />
    <path d="m8 12 2.6 2.6L16 9.2" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
