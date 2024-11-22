"use client";

/** 컴포넌트 */
import { Button, SearchBar } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Todos } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AsideSection() {
  const { toast } = useToast();
  const router = useRouter();
  const { id } = useParams();
  const [todos, setTodos] = useState<Todos[]>([]);

  const hadleCreateTask = async () => {
    try {
      const { data, status, error } = await supabase
        .from("todos")
        .insert([{ title: null, start_date: null, end_date: null, boards: [] }])
        .select();

      if (status === 201 && data !== null) {
        toast({
          title: " 새로운 task가 생성되었습니다.",
          description: "나만의 ToDo-Board를 생성해보세요!",
        });
        getTodos();
        router.push(`/board/${data[0].id}`);
      }
    } catch (e) {
      toast({
        title: " 에러가 발생했습니다.",
        description: "나만의 ToDo-Board를 생성해보세요!",
      });
    }
  };

  /** 우리가 생성한 todos 데이터 전체 조회 */
  const getTodos = async () => {
    try {
      let { data, status, error } = await supabase.from("todos").select("*");

      if (data !== null && status === 200) setTodos(data);
    } catch (e) {
      console.log(e);
      toast({
        title: " 에러가 발생했습니다.",
        description: "나만의 ToDo-Board를 생성해보세요!",
      });
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <aside className="page__aside">
      {/* 검색창 UI */}
      <SearchBar placeholder="검색어를 입력하세요." />
      {/* Add New Page 버튼 UI */}
      <Button className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]" onClick={hadleCreateTask}>
        Add New Page
      </Button>
      {/* TODO 목록 UI 하나 */}
      <div className="flex flex-col mt-4 gap-2">
        <small className="text-sm font-medium leading-none text-[#A6A6A6]">9Diin의 TODO-BOARD</small>
        <ul className="flex flex-col">
          {todos.length === 0 ? (
            <li className="bg-[#F5F5F5] min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm text-neutral-400">
              <div className="h-[6px] w-[6px] rounded-full bg-neutral-400"></div>
              등록된 Todos가 없습니다.
            </li>
          ) : (
            todos.map((todos: Todos) => {
              return (
                <li key={todos.id} className="bg-[#F5F5F5] min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm cursor-pointer">
                  <div className="h-[6px] w-[6px] rounded-full bg-[#00F38D]"></div>
                  {todos.title ? todos.title : "등록된 제목이 업습니다."}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </aside>
  );
}

export { AsideSection };
