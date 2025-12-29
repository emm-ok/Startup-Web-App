"use client";

import { deleteStartup } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteStartupButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteStartup(id);
      toast.success("Startup deleted successfully");
      router.push("/");
    } catch (error) {
      console.error("DELETE ERROR:", error);
      toast.error("Failed to delete startup");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="cursor-pointer bg-red-600 text-white rounded-full px-6 py-2 font-medium"
    >
      Delete
    </button>
  );
};

export default DeleteStartupButton;
