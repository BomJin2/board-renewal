import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { TodosAtom } from "@/stores/atoms";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

function useCreateTodos() {
  const router = useRouter();
  const { toast } = useToast();
  const [_, setTodos] = useAtom(TodosAtom);

  const createTodos = async () => {
    try {
      const { data, status, error } = await supabase
        .from("todos")
        .insert([
          {
            title: "",
            start_date: null,
            end_date: null,
            boards: [],
          },
        ])
        .select();

      if (data && status === 201) {
        setTodos((prevTasks) => [...prevTasks, data[0]]);
        toast({
          title: "새로운 Todo가 생성되었습니다.",
          description: "나만의 TODO-BOARD를 생성해보세요!",
        });
        router.push(`/board/${data[0].id}`);
      }
      if (error) {
        toast({
          variant: "destructive",
          title: "에러가 발생했습니다.",
          description: `Supabase 오류: ${error.message || "알 수 없는 오류"}`,
        });
      }
    } catch (error) {
      /** 네트워크 오류나 예기치 않은 에러를 잡기 위해 catch 구문 사용 */
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
      });
      console.error("API 호출 중 오류 발생:", error);
    }
  };
  return createTodos;
}

export { useCreateTodos };
