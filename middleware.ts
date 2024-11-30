import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "./lib/supabase/client";

const getTodo = async (todoId: number, userId: string) => {
  const supabase = createClient();
  /** 사용자 ID를 기준으로 Todo를 조회 */
  /** 여기서 userId는 로그인한 계정의 user_id */
  const { data, status, error } = await supabase.from("todos").select("*").eq("user_id", userId).eq("id", todoId);

  if (data && status === 200) return data[0];
  if (error) throw error;

  return null;
};

export async function middleware(request: NextRequest) {
  /** 로그인 페이지 접근 차단: LocalStorage 대신 쿠키로 로그인 여부 확인 */

  const user = request.cookies.get("user"); // 쿠키에서 user 정보 확인 (예: 서버에서 쿠키로 사용자 정보 전달)

  /** 사용자가 로그인 상태일 때, 로그인 페이지에 접근하면 리다이렉트 */
  if (request.nextUrl.pathname === "/" && user) {
    /** 로그인 상태이면 콘텐츠 페이지로 리다이렉트 */
    return NextResponse.redirect(new URL("/board", request.url));
  }

  /** 사용자가 로그인 되지 않았을 경우, /board 페이지 같은 콘텐츠 페이지 접근했을 시 로그인 페이지로 리다이렉트 */
  if (request.nextUrl.pathname.startsWith("/board") && !user) {
    /** 비로그인 상태이면 로그인 페이지로 리다이렉트 */

    return NextResponse.redirect(new URL("/", request.url));
  }

  /** 사용자가 로그인이 된 경우, /board/:path* 경로와 같은 콘텐츠 페이지에 접근했을 시
   * 로그인된 유저의 todo가 아니면 not-found 페이지로 리다이렉션
   *
   * 1. 로그인된 사용자가 특정 todo를 조회하려하는 경우, todo의 id 확인
   */
  if (request.nextUrl.pathname.startsWith("/board/")) {
    const todoId = parseInt(request.nextUrl.pathname.split("/board/")[1], 10); // 잘못된 todoId로 접근할 때 로그인 페이지로 리다이렉션

    //

    // 1. todoId가 유효하지 않으면 에러 처리
    if (isNaN(todoId)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 2. 사용자가 로그인 상태인 경우, 해당 todo가 본인의 것인지 체크
    if (user) {
      const todo = await getTodo(todoId, JSON.parse(user.value).id);
      if (!todo) {
        return NextResponse.redirect(new URL("/not-found", request.url));
      }
    }
  }
  /** 기본적인 요청을 그대로 진행 */
  return NextResponse.next();
}

/** 미들웨어가 적용될 경로를 설정(모든 경로에 미들웨어 적용) */
export const config = {
  matcher: ["/", "/board/:path*"],
};
