import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { TodoAtom } from "@/stores/atoms";
import { Board } from "@/types";
import { useAtom } from "jotai";
import { useGetTodoById } from "./useGetTodoById";

const useDeleteBoard = (todoId: number, boardId: string) => {
  const { toast } = useToast();
  const [todo, setTodo] = useAtom(TodoAtom);
  const { getTodoById } = useGetTodoById(todoId);
  const deleteBoard = async () => {
    try {
      const { data, status, error } = await supabase
        .from("todos")
        .update({
          boards: [todo?.boards.filter((board: Board) => board.id !== boardId)],
        })
        .eq("id", todoId);

      if (data !== null && status === 204) {
        /** 서버에서 데이터 갱신 후 상태값을 업데이트 */
        toast({
          title: "Todo-Board가 삭제되었습니다.",
          description: "새로운 Todo-Board를 생성해보세용",
        });

        getTodoById();
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
  return deleteBoard;
};
export { useDeleteBoard };
