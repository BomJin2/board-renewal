"use client";

/** 컴포넌트 */
import { Button, SearchBar } from "@/components/ui";
import { useGetTodos, useCreateTodos } from "@/hooks/api";
import { Todos } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { NavUser } from "./NavUser";


function AsideSection() {
  const { id } = useParams();
  const { todos, getTodos } = useGetTodos();

  const handleCreateTodos = useCreateTodos();

  const router = useRouter();

  const userData = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/assets/images/profile.gif",
  };


  useEffect(() => {
    getTodos();
  }, [id]);

  return (
    <aside className="page__aside">
      {/* 검색창 UI */}
      <SearchBar placeholder="검색어를 입력하세요." />
      {/* Add New Page 버튼 UI */}
      <Button className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]" onClick={handleCreateTodos}>

        Add New Page
      </Button>
      {/* TODO 목록 UI 하나 */}
      <div className="flex flex-col mt-4 gap-2">
        <small className="text-sm font-medium leading-none text-[#A6A6A6]">Bomjin's TODO-BOARD</small>
        <ul className="flex flex-col">

          {todos.length ? (
            todos.map((todo: Todos) => {
              return (
                <li
                  key={todo.id}
                  className={`${
                    todo.id === Number(id) ? "bg-[#F5F5F5]" : ""
                  }  min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm cursor-pointer`}
                  onClick={() => router.push(`/board/${todo.id}`)}
                >
                  <div className={`${todo.id === Number(id) ? "bg-[#00F38D]" : "bg-neutral-400"} h-[6px] w-[6px] rounded-full `}></div>
                  <span className={`${todo.id !== Number(id) && "text-neutral-400"}`}>{todo.title ? todo.title : "등록된 제목이 업습니다."}</span>
                </li>
              );
            })
          ) : (
            <li className=" min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm text-neutral-400">
              <div className="h-[6px] w-[6px] rounded-full bg-neutral-400"></div>
              등록된 Todos가 없습니다.
            </li>

          )}
        </ul>
      </div>
      <NavUser user={userData} />
    </aside>
  );
}

export { AsideSection };
