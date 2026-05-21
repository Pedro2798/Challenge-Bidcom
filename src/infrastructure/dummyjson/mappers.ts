import type { Category } from "@/domain/entities/category";
import type { Product } from "@/domain/entities/product";
import type { DummyJSONCategoryDTO, DummyJSONProductDTO } from "./dtos";

export function toProduct(dto: DummyJSONProductDTO): Product {
  return {
    id: dto.id,
    sku: dto.sku,
    title: dto.title,
    description: dto.description,
    category: dto.category,
    brand: dto.brand ?? null,
    price: dto.price,
    discountPercentage: dto.discountPercentage,
    rating: dto.rating,
    stock: dto.stock,
    thumbnail: dto.thumbnail,
    images: dto.images,
  };
}

export function toCategory(dto: DummyJSONCategoryDTO): Category {
  return {
    slug: dto.slug,
    name: dto.name,
  };
}
