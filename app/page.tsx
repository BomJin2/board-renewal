"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
/** UI 컴포넌트 */
import { Button } from "@/components/ui";

function InitPage() {
  const router = useRouter();
  const { toast } = useToast();

  /** Add New Page 버튼을 클릭하였을 때, TODO-LIST 생성 */
  const handleCreateTask = async () => {
    try {
      const { data, status } = await supabase
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

      if (status === 201 && data !== null) {
        toast({ title: "새로운 TASK가 생성되었습니다.", description: "나만의 TODO-BOARD를 생성해보세요!" });
        router.push(`/board/${data[0].id}`);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "에러가 발생했습니다.",
        description: "예상치 못한 에러가 발생했습니다. 문의해주세요!",
      });
    }
  };

