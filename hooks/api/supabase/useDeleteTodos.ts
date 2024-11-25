"use client";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

const useDeleteTodos = () => {
  const { toast } = useToast();
  const router = useRouter();

  const deleteTodos = async (todosId: number) => {
    try {
      const { status, error } = await supabase.from("todos").delete().eq("id", todosId);

      if (status === 204) {
        toast({
          title: "삭제 되었습니다.",
          description: "새로운 테이블을 만들어보세요",
        });
        router.push("/");
      }
    } catch (e) {
      toast({
        title: " 에러임.",
        description: "다시 시도해보세요",
        variant: "destructive",
      });
    }
  };
  return deleteTodos;
};
export { useDeleteTodos };
