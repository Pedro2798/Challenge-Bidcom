import { ProductCardSkeleton } from "@/presentation/components/molecules/product-card-skeleton";

export interface ProductGridSkeletonProps {
  count?: number;
}

export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <ul
      aria-hidden="true"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="h-full">
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
