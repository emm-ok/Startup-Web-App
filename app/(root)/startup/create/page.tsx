import StartupForm from "@/components/StartupForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if(!session) redirect('/');


  return (
    <>
      <section className="pink_container min-h-[230px] flex justify-center items-center">
        <h1 className="heading text-3xl font-bold bg-black text-white p-8 rounded-xl">Submit Your Startup</h1>
      </section>

      <StartupForm />
    </>
  );
};

export default Page;
