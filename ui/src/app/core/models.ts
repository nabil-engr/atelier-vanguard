export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  fabric: string;
  origin: string;
  basePrice: number;
  currency: string;
  imageUrl: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  fabric: string;
  fit: string;
  monogram: string;
  quantity: number;
}

export interface OrderStage {
  name: string;
  complete: boolean;
  date?: string;
}
