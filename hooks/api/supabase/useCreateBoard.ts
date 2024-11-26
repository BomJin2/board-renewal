import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { TodoAtom, TodosAtom } from "@/stores/atoms";
import { useAtom } from "jotai";

const useCreateBoard = () => {
  const { toast } = useToast();
  const [_, setTodo] = useAtom(TodoAtom);

  const createBoard = async (todoId: number, columm: string, newValue: any) => {
    try {
      const { data, status, error } = await supabase
        .from("todos")
        .update({ [columm]: newValue })
        .eq("id", todoId)
        .select();

      if (data !== null && status === 200) {
        toast({
          title: "새로운 Todo-Board를 생성했습니다",
          description: "확인해보쇼",
        });
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
    }
  };
  return createBoard;
};
export { useCreateBoard };
