export type CountryCode = "KG" | "KZ" | "UZ";
export type Locale = "ru" | "ky" | "en" | "kk" | "uz" | "tr";

export interface CountryConfig {
  code: CountryCode;
  name: string;
  currency: string;
  phonePrefix: string;
  active: boolean;
}

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  KG: { code: "KG", name: "Кыргызстан", currency: "сом", phonePrefix: "+996", active: true },
  KZ: { code: "KZ", name: "Қазақстан", currency: "₸", phonePrefix: "+7", active: false },
  UZ: { code: "UZ", name: "Ўзбекистон", currency: "so'm", phonePrefix: "+998", active: false },
};

export type ProductCondition = "new" | "used";

export interface Seller {
  id: string;
  name: string;
  avatarSeed: string;
  verified: boolean;
  rating: number;
  positivePct: number;
  salesCount: number;
  yearsOnPlatform: number;
  city: string;
}

export interface Store {
  id: string;
  sellerId: string;
  name: string;
  coverSeed: string;
  logoSeed: string;
  verified: boolean;
  followers: number;
  rating: number;
  salesCount: number;
}

export interface Product {
  id: string;
  title: string;
  imageSeed: string;
  price: number; // KGS
  oldPrice?: number;
  condition: ProductCondition;
  categoryId: string;
  sellerId: string;
  storeId?: string;
  rating: number;
  reviewsCount: number;
  city: string;
  createdAt: string; // ISO
  isAuction?: boolean;
}

export type AuctionStatus = "live" | "ending_soon" | "sold";

export interface Auction {
  id: string;
  productId: string;
  currentBid: number;
  startingPrice: number;
  bidsCount: number;
  participants: number;
  endsAt: string; // ISO — demo offsets from now
  buyNowPrice?: number;
  status: AuctionStatus;
  lastBids: { bidder: string; amount: number; at: string }[];
}

export interface Category {
  id: string;
  emoji: string;
  label: string;
}
