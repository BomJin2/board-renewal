"use client";

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@/components/ui";
import useEmailCheck from "@/hooks/use-email";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ChangePasswordPage() {
  const supabase = createClient();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [aginPassword, setAgainPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword((prevState) => !prevState);
  const router = useRouter();

  const handleChangePassword = async () => {
    if (password.length && aginPassword.length < 8) {
      toast({
        variant: "destructive",
        title: "비밀버호는 최소 8자 이상이어야 합니다.",
        description: "비밀번호를 다시 입력해 주세요",
      });
      return;
    }
    try {
      if (password === aginPassword) {
        await supabase.auth.updateUser({ password: password });
        toast({
          title: "비밀번호가 변경되었습니다",
          description: "새로운 비밀번호로 로그인해보세요",
        });
        router.push("/");
      }

      if (password !== aginPassword) {
        toast({
          title: "비밀번호를 다시 확인하세요",
          description: "비밀번호를 재확인 해보세요",
          variant: "destructive",
        });
      }
    } catch (e) {}
  };

  return (
    <div className="page">
      <div className="page__container">
        {/* 소개 문구 */}
        <div className="flex flex-col items-center mt-10">
          <h4 className="text-lg font-semibold">안녕하세요 👋🏻</h4>
          <div className="flex flex-col items-center justify-center mt-2 mb-4">
            <div className="text-sm text-muted-foreground">
              <small className="text-sm text-[#e79057] font-medium leading-none">TASK 관리 앱</small>에 방문해주셔서 감사합니다.
            </div>
            <p className="text-sm text-muted-foreground">서비스를 이용하려면 로그인을 진행해주세요.</p>
          </div>
        </div>
        <form action="submit"></form>

        <Card className="w-[400px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">비밀번호 변경</CardTitle>
            <CardDescription>비밀번호 변경을 위해 변경된 비밀번호를 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="relative grid gap-2">
              <Label htmlFor="email">비밀번호</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요."
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                size={"icon"}
                className="absolute top-[38px] right-2 -translate-y-1/4 bg-transparent hover:bg-transparent"
                onClick={togglePassword}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
              </Button>
            </div>
            <div className="relative grid gap-2">
              <Label htmlFor="againPassword">비밀번호 재확인</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요."
                required
                value={aginPassword}
                onChange={(e) => setAgainPassword(e.target.value)}
              />
              <Button
                size={"icon"}
                className="absolute top-[38px] right-2 -translate-y-1/4 bg-transparent hover:bg-transparent"
                onClick={togglePassword}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
              </Button>
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
                onClick={handleChangePassword}
              >
                비밀번호 변경
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              이미 계정이 있으신가요?
              <Link href={"/"} className="underline text-sm ml-1">
                로그인
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
