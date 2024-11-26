"use client";

import Image from "next/image";
/** UI 컴포넌트 */

import { ChevronLeft } from "@/public/assets/icons";
/** 스타일 */
import styles from "./page.module.scss";
import { Button, LabelDatePicker, Progress } from "@/components/ui";
import { AlertPopup, BoardCard } from "@/components/common";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Board } from "@/types";
import { nanoid } from "nanoid";
import { useCreateBoard, useGetTodoById, useGetTodos } from "@/hooks/api";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

function BoardUniquePage() {
  const { id } = useParams();
  const { getTodos } = useGetTodos();
  const { todo } = useGetTodoById(Number(id)); // 특정 id 값에 따른 todo 데이터

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [boards, setBoards] = useState<Board[]>([]);
  const [count, setCount] = useState<number>(0);
  const router = useRouter();

  const createBoard = useCreateBoard();

  /** 특정 ID값에 따른  */

  const handleCreateBoard = () => {
    const newBoard: Board = {
      id: nanoid(),
      title: "",
      startDate: null,
      endDate: null,
      contnet: "",
      isCompleted: false,
    };

    const newBoards = [...boards, newBoard];
    setBoards(newBoards);
    createBoard(Number(id), "boards", newBoards);
  };

  const handleSave = async () => {
    if (!title || !startDate || !endDate) {
      toast({
        variant: "destructive",
        title: "기입되지 않은 데이터(값)이 있습니다.",
        description: "수정한 Todos의 마감일을 꼭 지켜주세요!",
      });
      return;
    }
    try {
      const { data, status, error } = await supabase
        .from("todos")
        .update({
          title: title,
          start_date: startDate,
          end_date: endDate,
        })
        .eq("id", id)
        .select();

      if (data !== null && status === 200) {
        /** 서버에서 데이터 갱신 후 상태값을 업데이트 */
        toast({
          title: "수정이 완료되었습니다.",
          description: "확인해보셔",
        });
        getTodos();
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

  /** todo가 로드되면, 상태값 업데이트 */
  useEffect(() => {
    if (todo) {
      setTitle(todo.title || "");
      setStartDate(todo.startDate);
      setEndDate(todo.endDate);
      setBoards(todo.boards);
    }
  }, [todo]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles[`header__btn-box`]}>
          <Button variant={"outline"} size={"icon"} onClick={() => router.push("/")}>
            <ChevronLeft />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant={"secondary"} onClick={handleSave}>
              저장
            </Button>
            <AlertPopup>
              <Button className="text-rose-600 bg-red-50 hover:bg-rose-50">삭제</Button>
            </AlertPopup>
          </div>
        </div>
        <div className={styles.header__top}>
          {/* 제목 입력 Input 섹션 */}
          <input
            type="text"
            value={title}
            placeholder="Enter Title Here!"
            className={styles.header__top__input}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* 진행상황 척도 그래프 섹션 */}
          <div className="flex items-center justify-start gap-4">
            <small className="text-sm font-medium leading-none text-[#6D6D6D]">1/10 Completed</small>
            <Progress className="w-60 h-[10px]" value={33} />
          </div>
        </div>
        {/* 캘린더 + Add New Board 버튼 섹션 */}
        <div className={styles.header__bottom}>
          <div className="flex items-center gap-5">
            <LabelDatePicker label={"From"} value={startDate} onChange={setStartDate} />
            <LabelDatePicker label={"To"} value={endDate} onChange={setEndDate} />
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
        {boards.length === 0 ? (

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
            {boards.map((board: Board) => {
              return <BoardCard key={board.id} board={board} />;

            })}
          </div>
        )}
      </div>
    </>
  );
}

export default BoardUniquePage;
