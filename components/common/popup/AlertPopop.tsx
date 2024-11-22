"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";
import { toast, useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

function AlertPopup({ children }: Props) {
  const { toast } = useToast();
  const { id } = useParams();
  const router = useRouter();

  const handleDeleteTodos = async () => {
    try {
      const { status, error } = await supabase.from("todos").delete().eq("id", id);

      if (status === 204) {
        toast({
          title: "삭제 되었습니다.",
          description: "새로운 테이블을 만들어보세요",
        });
        router.push("/");
      }
    } catch (e) {
      toast({
        title: " 에러임.",
        description: "다시 시도해보세요",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>해당 TASK를 정말로 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            이 작업이 실행되면 다시 취소할 수 없습니다.
            <br /> 삭제가 진행되면 귀하의 게시물은 영구적으로 삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteTodos} className="bg-red-600 hover:bg-rose-600">
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { AlertPopup };
