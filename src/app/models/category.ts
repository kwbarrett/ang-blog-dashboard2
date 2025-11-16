export interface Category {
  id: number;
  category_name: string;
}

export interface ApiResponse<T = unknown> {
  success: number;   // 1 = ok, 0 = logical error
  message: string;
  data?: T;
}
