import { Skeleton } from "@/presentation/components/atoms";

export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-pop">
      <Skeleton className="aspect-square w-full rounded-none border-b-2 border-ink" />
      <div className="flex flex-col gap-3 p-4">
        <Skeleton shape="line" className="w-1/3" />
        <Skeleton shape="line" className="w-5/6" />
        <Skeleton shape="line" className="w-2/3" />
        <Skeleton shape="line" className="mt-2 h-5 w-1/2" />
      </div>
    </div>
  );
}
