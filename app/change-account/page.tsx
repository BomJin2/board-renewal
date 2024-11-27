"use client";

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { userAtom } from "@/stores/atoms";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ChangeAccount = () => {
  const supabase = createClient();
  const { toast } = useToast();
  const [userName, setUserName] = useState("");
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const handleChangeAccount = async () => {
    if (!userName) {
      toast({
        variant: "destructive",
        title: "프로필 수정을 원치 않으시면 '취소' 버튼을 눌러주세요!",
      });
      return;
    } else {
      try {
        const user = await supabase.auth.getUser(); // 로그인된 사용자의 정보 가져오기

        if (user.data) {
          const { data, error } = await supabase.auth.updateUser({
            data: { user_name: userName },
          });

          if (error) {
            toast({
              variant: "destructive",
              title: "에러가 발생했습니다.",
              description: `Supabase 오류: ${error.message || "알 수 없는 오류"}`,
            });
          } else if (data && !error) {
            toast({
              title: "프로필 수정을 완료하였습니다.",
            });
            console.log(data);
            const updatedUserData = {
              id: data.user?.id || "",
              email: data.user?.email || "",
              userName: data.user?.user_metadata.user_name || "",
              imgUrl: "/assets/images/profile.gif",
            };
            setUser(updatedUserData);
            router.push("/board");
          }
        }
      } catch (error) {
        /** 네트워크 오류나 예기치 않은 에러를 잡기 위해 catch 구문 사용 */
        console.error(error);
        toast({
          variant: "destructive",
          title: "네트워크 오류",
          description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user.userName || "");
    }
  }, [user]);
  return (
    <>
      <div className="page">
        <div className="page__container">
          {/* 소개 문구 */}
          <div className="flex flex-col items-center mt-10">
            <h4 className="text-lg font-semibold">안녕하세요 👋🏻</h4>
            <div className="flex flex-col items-center justify-center mt-2 mb-4">
              <div className="text-sm text-muted-foreground">
                <small className="text-sm text-[#e79057] font-medium leading-none">TASK 관리 앱</small>에 방문해주셔서 감사합니다.
              </div>
            </div>
          </div>
          <form action="submit"></form>

          <Card className="w-[400px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">회원정보 수정</CardTitle>
              <CardDescription>회원정보 수정을 위한 페이지입니다.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="relative grid gap-2">
                <Label htmlFor="againPassword">닉네임</Label>
                <Input
                  id="password"
                  type={"text"}
                  placeholder="닉네임을 입력하세요."
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </CardContent>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground"></span>
              </div>
            </div>
            <CardFooter className="flex flex-col mt-6">
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button variant={"outline"} className="w-full" onClick={() => router.push("/")}>
                  이전
                </Button>
                <Button
                  className="w-full text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
                  onClick={handleChangeAccount}
                >
                  회원정보 수정
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};
export default ChangeAccount;
