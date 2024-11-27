export interface Todos {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  boards: Board[];
}

export interface Board {
  id: string; // 추후에 Supabase boards 컬럼을 다른 테이블로 분리할 경우 타입이 변경될 수 있음
  title: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  contnet: string;
  isCompleted: boolean;
}

export interface User {
  id: string;
  email: string;
  userName: string;
  imgUrl: string;
}
