export interface AIUsage {
  used: number;
  limit: number;
  remaining: number;
}

export interface AskBlogPayload {
  blogId: string;
  question: string;
}

export interface SummarizeBlogPayload {
  blogId: string;
}

export interface AIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AskBlogResponse {
  answer: string | null;
  usage: AIUsage;
}

export interface SummarizeBlogResponse {
  summary: string | null;
  cached: boolean;
  generatedAt?: string;
  usage?: AIUsage;
}

export interface GenerateBlogResponse {
  title: string;
  description: string;
  content: string;
  usage: AIUsage;
}
