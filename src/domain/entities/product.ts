export interface Product {
  id: number;
  sku: string;
  title: string;
  description: string;
  category: string;
  brand: string | null;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
}

export function finalPrice(product: Pick<Product, "price" | "discountPercentage">): number {
  const discounted = product.price * (1 - product.discountPercentage / 100);
  return Math.round(discounted * 100) / 100;
}
