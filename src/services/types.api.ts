export interface ApiResponse<T> {
  success: boolean;
  message: string;
  trace_id: string;
  data: T;
}

export interface ApiError {
  message: string;
  data?: any;
  trace_id?: string;
  success?: boolean;
}
