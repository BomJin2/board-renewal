import Image from "next/image";
/** UI 컴포넌트 */

import { ChevronLeft } from "@/public/assets/icons";
/** 스타일 */
import styles from "./page.module.scss";
import { Button, LabelDatePicker, Progress } from "@/components/ui";
import { AlertPopup, BoardCard } from "@/components/common";

function BoardUniquePage() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles[`header__btn-box`]}>
          <Button variant={"outline"} size={"icon"}>
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
          <Button className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg">
            Add New Board
          </Button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.body__isData}>
          <BoardCard />
        </div>
      </div>
    </>
  );
}

export default BoardUniquePage;
