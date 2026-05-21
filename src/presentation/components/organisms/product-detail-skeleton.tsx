import { Skeleton } from "@/presentation/components/atoms";

export function ProductDetailSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12"
    >
      <Skeleton className="aspect-square w-full rounded-3xl" />
      <div className="flex flex-col gap-4">
        <Skeleton shape="line" className="w-1/4" />
        <Skeleton shape="line" className="h-8 w-3/4" />
        <Skeleton shape="line" className="w-1/2" />
        <Skeleton className="mt-4 h-24 w-full rounded-2xl" />
        <Skeleton shape="line" className="mt-2 w-full" />
        <Skeleton shape="line" className="w-5/6" />
        <Skeleton shape="line" className="w-4/6" />
        <Skeleton className="mt-4 h-12 w-48 rounded-xl" />
      </div>
    </section>
  );
}
