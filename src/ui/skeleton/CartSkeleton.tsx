import { Card, Skeleton } from "@nextui-org/react";

export default function CartSkeleton({ quantity }: { quantity: number }) {
  return (
    <div>
      {Array.from({ length: quantity }).map((_, index) => (
        <Card
          key={index}
          className="max-w-[350px] max-h-64 space-y-5 p-4 flex border-none"
          radius="lg"
          shadow="none"
        >
          <div>
            <Skeleton className="rounded-lg">
              <div className="h-8 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="w-3/5 h-3 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="w-4/5 h-3 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="w-2/5 h-3 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
  );
}
