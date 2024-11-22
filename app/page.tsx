"use client";

import { Button } from "@/components/ui";
import { toast, useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

function InitPage() {
  const { toast } = useToast();
  const router = useRouter();

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
        router.push(`/board/${data[0].id}`);
      }
    } catch (e) {
      toast({

        title: " 에러임.",
        description: "다시 시도해보세요",
        variant: "destructive",

      });
    }
  };

  useEffect(() => {});

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5 mb-6">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">How to start:</h3>
        <div className="flex flex-col items-center gap-3">
          <small className="text-sm font-normal leading-none">1. Create a page</small>
          <small className="text-sm font-normal leading-none">2. Add boards to page</small>
        </div>
      </div>
      <Button className="text-[#E79057] bg-transparent border border-[#E79057] hover:bg-[#FFF9F5] w-[180px]" onClick={hadleCreateTask}>
        Add New Page
      </Button>
    </div>
  );
}

export default InitPage;
