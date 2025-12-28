import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import StartupDetails from "./StartupDetails";
import View from "@/components/View";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <StartupDetails id={params.id} />
      </Suspense>

      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={params.id} />
      </Suspense>
    </>
  );
}
