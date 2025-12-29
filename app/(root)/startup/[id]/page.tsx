import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import StartupDetails from "./StartupDetails";
import View from "@/components/View";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
const { id } = await params;

  return (
    <>
      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <StartupDetails id={id} />
      </Suspense>

      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={id} />
      </Suspense>
    </>
  );
}
