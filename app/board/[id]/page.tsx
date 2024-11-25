"use client";

import Image from "next/image";
/** UI 컴포넌트 */

import { ChevronLeft } from "@/public/assets/icons";
/** 스타일 */
import styles from "./page.module.scss";
import { Button, LabelDatePicker, Progress } from "@/components/ui";
import { AlertPopup, BoardCard } from "@/components/common";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Board, Todos } from "@/types";
import { nanoid } from "nanoid";
import { toast } from "@/hooks/use-toast";

function BoardUniquePage() {
  const { id } = useParams();
  const [todos, setTodos] = useState<Todos>();
  const [boards, setBoards] = useState<Board[]>(todos?.boards || []);


  /** 특정 ID값에 따른  */
  const getTodos = async () => {
    try {
      const { data, status, error } = await supabase.from("todos").select("*").eq("id", id).select();

      if (data !== null && status === 200) setTodos(data[0]);
    } catch (e) {
      console.log(e);
      toast({
        title: " 에러임.",
        description: "다시 시도해보세요",
        variant: "destructive",
      });
    }
  };

  const handleCreateBoard = () => {
    const newBoard: Board = {
      id: nanoid(),
      title: "",
      startDate: null,
      endDate: null,
      contnet: "",
      isCompleted: false,
    };
    setBoards((pre) => [...pre, newBoard]);
    updateTodosOneColById(Number(id), "boards", boards);
  };

  const updateTodosOneColById = async (uid: number, column: string, newValue: any) => {
    try {
      const { data, status } = await supabase
        .from("todos")
        .update({ [column]: newValue })
        .eq("id", uid);

      if (data !== null && status === 204) {
        toast({
          title: "새로운 Todo-Board를 생성했습니다.",
          description: "생성한 Todo-Board를 이브게 꾸며주새오",
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        title: " 에러임.",
        description: "다시 시도해보세요",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getTodos();
  }, [boards]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles[`header__btn-box`]}>
          <Button variant={"outline"} size={"icon"} onClick={() => router.push("/")}>
            <ChevronLeft />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant={"secondary"}>저장</Button>
            <AlertPopup>
              <Button className="text-rose-600 bg-red-50 hover:bg-rose-50">삭제</Button>
            </AlertPopup>
          </div>
        </div>
        <div className={styles.header__top}>
          {/* 제목 입력 Input 섹션 */}
          <input type="text" placeholder="Enter Title Here!" className={styles.header__top__input} />
          {/* 진행상황 척도 그래프 섹션 */}
          <div className="flex items-center justify-start gap-4">
            <small className="text-sm font-medium leading-none text-[#6D6D6D]">1/10 Completed</small>
            <Progress className="w-60 h-[10px]" value={33} />
          </div>
        </div>
        {/* 캘린더 + Add New Board 버튼 섹션 */}
        <div className={styles.header__bottom}>
          <div className="flex items-center gap-5">
            <LabelDatePicker label={"From"} />
            <LabelDatePicker label={"To"} />
          </div>
          <Button
            className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
            onClick={handleCreateBoard}
          >
            Add New Board
          </Button>
        </div>
      </div>
      <div className={styles.body}>
        {todos?.boards.length === 0 ? (
          <div className={styles.body__noData}>
            {/* Add New Board 버튼 클릭으로 인한 Board 데이터가 없을 경우 */}
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">There is no board yet.</h3>
            <small className="text-sm font-medium leading-none text-[#6D6D6D] mt-3 mb-7">Click the button and start flashing!</small>
            <button onClick={handleCreateBoard}>
              <Image src="/assets/images/button.svg" width={74} height={74} alt="rounded-button" />
            </button>
          </div>
        ) : (
          <div className={styles.body__isData}>
            {/* Add New Board 버튼 클릭으로 인한 Board 데이터가 있을 경우 */}
            {todos?.boards.map((board: Board) => {
              return <BoardCard key={board.id} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default BoardUniquePage;
