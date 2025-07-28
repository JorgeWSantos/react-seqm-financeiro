export interface ApiResponse<T> {
  success: boolean;
  message: string;
  trace_id: string;
  data: T;
  meta?: Meta;
}

interface Meta {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}

export interface ApiError {
  message: string;
  data?: any;
  trace_id?: string;
  success?: boolean;
}
