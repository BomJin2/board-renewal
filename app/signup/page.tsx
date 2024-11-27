"use client";

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@/components/ui";
import useEmailCheck from "@/hooks/use-email";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignupPage() {
  const supabase = createClient();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { checkEmail } = useEmailCheck();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword((prevState) => !prevState);

  const handleSignup = async () => {
    if (!email || !password || !userName) {
      toast({
        variant: "destructive",
        title: "기입되지 않은 데이터(값)가 있습니다..",
        description: "이메일과 비밀번호, 닉네임는 필수 값입니다.",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "비밀버호는 최소 8자 이상이어야 합니다.",
        description: "비밀번호를 다시 입력해 주세요",
      });
      return;
    }

    if (!checkEmail(email)) {
      toast({
        variant: "destructive",
        title: "올바르지 않은 이메일 양식입니다.",
        description: "올바른 이메일 양식을 작성해주세요!",
      });
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            user_name: userName,
          },
        },
      });

      console.log(data);
      if (error) {
        toast({
          variant: "destructive",
          title: "에러가 발생했습니다.",
          description: `Supabase 오류: ${error.message || "알 수 없는 오류"}`,
        });
      } else if (data && !error) {
        toast({
          title: "회원가입을 성공하였습니다.",
          description: "로그인 페이지로 이동하여 로그인을 진행해주세요",
        });
        router.push("/");
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

  const router = useRouter();
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
            <CardTitle className="text-2xl">회원가입</CardTitle>
            <CardDescription>계정을 생성하기 위해 아래 정보를 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="이메일을 입력하세요."
                required
                onChange={(e) => setEmail(e.target.value)}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
            </div>
            <div className="relative grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요."
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
              <Label htmlFor="userName">닉네임</Label>
              <Input
                id="userName"
                type={"text"}
                placeholder="닉네임을 입력하세요."
                required
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
          </CardContent>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">간편 회원가입을 원하시면 이전 버튼을 누르세요</span>
            </div>
          </div>
          <CardFooter className="flex flex-col mt-6">
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button variant={"outline"} className="w-full" onClick={() => router.push("/")}>
                이전
              </Button>
              <Button
                className="w-full text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
                onClick={handleSignup}
              >
                회원가입
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

export default SignupPage;
