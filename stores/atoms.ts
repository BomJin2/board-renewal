import { atom } from "jotai";
import { Todos, User } from "@/types";

/** Supabase에 저장되어 있는 'tasks' 테이블 내 모든 데이터 조회  */
/** 전체 tasks 목록 상태 */
export const TodosAtom = atom<Todos[]>([]);

/** 개별(단일) task 상태 */
export const TodoAtom = atom<Todos | null>(null);

export const userAtom = atom<User>();
