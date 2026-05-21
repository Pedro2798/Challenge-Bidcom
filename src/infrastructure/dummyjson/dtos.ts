export interface DummyJSONProductDTO {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight?: number;
  thumbnail: string;
  images: string[];
}

export interface DummyJSONProductsResponse {
  products: DummyJSONProductDTO[];
  total: number;
  skip: number;
  limit: number;
}

export interface DummyJSONCategoryDTO {
  slug: string;
  name: string;
  url: string;
}
