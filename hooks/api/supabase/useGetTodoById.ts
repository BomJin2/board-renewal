"use client";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { TodoAtom } from "@/stores/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

const useGetTodoById = (todoId: number) => {
  const [todo, setTodo] = useAtom(TodoAtom);
  const { toast } = useToast();
  const getTodoById = async () => {
    try {
      const { data, status, error } = await supabase.from("todos").select("*").eq("id", todoId);

      if (data && status === 200) {
        setTodo(data[0]);
      }
      if (error) {
        toast({
          variant: "destructive",
          title: "에러가 발생했습니다.",
          description: `Supabase 오류: ${error.message || "알 수 없는 오류"}`,
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
      });
      console.error("API 호출 중 오류 발생:", e);
    }
  };

  useEffect(() => {
    if (todoId) getTodoById();
  }, [todoId]);

  return { todo, getTodoById };
};
export { useGetTodoById };
