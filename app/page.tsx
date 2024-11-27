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
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui";
import useEmailCheck from "@/hooks/use-email";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { userAtom } from "@/stores/atoms";
import { useAtom } from "jotai";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import path from "path";
import { useEffect, useState } from "react";

function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [user, setUser] = useAtom(userAtom);
  const { checkEmail } = useEmailCheck();
  const [changeEmail, setChangeEmail] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword((prevState) => !prevState);
  const supabase = createClient();

  useEffect(() => {}, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "기입되지 않은 데이터(값)가 있습니다..",
        description: "이메일과 비밀번호는 필수 값입니다.",
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
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
          title: "로그인에 성공하였습니다.",
          description: "Todo-List를 작성해보세요!",
        });

        /** 쿠키에 저장할 user 데이터 */
        const userData = {
          id: data.user?.id || "",
          email: data.user?.email || "",
          phone: data.user?.phone || "",
          userName: data.user?.user_metadata.user_name || "",
          imgUrl: "assets/images/profile.gif",
        };
        document.cookie = `user=${JSON.stringify(userData)} path =/ max-age=3600`; // 1시간 동안 유효

        setUser(userData);
        router.push("/board");
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

  const handleChangePassword = async () => {
    if (!checkEmail(changeEmail)) {
      toast({
        variant: "destructive",
        title: "올바르지 않은 이메일 양식입니다.",
        description: "올바른 이메일 양식을 작성해주세요!",
      });
      return;
    }

    try {
      await supabase.auth.resetPasswordForEmail(changeEmail, {
        redirectTo: "http://localhost:3000/update-password",
      });

      if (changeEmail) {
        toast({
          title: "비밀번호를 변경해주세요",
          description: "메일이 전송되었습니다. 원하시는 비밀번호로 변경하세요",
        });
      }

      if (changeEmail.length === 0 || null) {
        toast({
          variant: "destructive",
          title: "이메일을 입력하세요",
          description: "가입하셨던 이메일을 입력해주세요",
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
        <Card className="w-[400px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">로그인</CardTitle>
            <CardDescription>로그인을 위한 정보를 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" value={email} placeholder="이메일을 입력하세요." onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="relative grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">비밀번호</Label>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Link href={"#"} className="ml-auto inline-block text-sm underline">
                      비밀번호를 잊으셨나요?
                    </Link>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>비밀번호를 초기화 할 이메일 주소를 입력해주세요</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="grid gap-2">
                      <Label htmlFor="email">이메일</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="이메일을 입력하세요."
                        value={changeEmail}
                        onChange={(e) => setChangeEmail(e.target.value)}
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction onClick={handleChangePassword}>확인</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
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
          </CardContent>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <CardFooter className="flex flex-col mt-6">
            <Button
              className="w-full text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
              onClick={handleLogin}
            >
              로그인
            </Button>
            <div className="mt-4 text-center text-sm">
              계정이 없으신가요?
              <Link href={"/signup"} className="underline text-sm ml-1">
                회원가입
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
