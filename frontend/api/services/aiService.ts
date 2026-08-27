import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import type {
  AIResponse,
  AskBlogPayload,
  AskBlogResponse,
  GenerateBlogResponse,
  SummarizeBlogPayload,
  SummarizeBlogResponse,
} from "@/types/ai";

export type {
  AIUsage,
  GenerateBlogResponse,
} from "@/types/ai";

export const aiService = {
  async askAboutBlog(blogId: string, question: string) {
    const payload: AskBlogPayload = { blogId, question };
    const response = await AxiosInstance.post<AIResponse<AskBlogResponse>>(
      endPoints.ai.askBlog,
      payload,
    );
    return response.data;
  },

  async summarizeBlog(blogId: string) {
    const payload: SummarizeBlogPayload = { blogId };
    const response = await AxiosInstance.post<AIResponse<SummarizeBlogResponse>>(
      endPoints.ai.summarizeBlog,
      payload,
    );
    return response.data;
  },

  async generateBlog(topic: string, instructions?: string) {
    const response = await AxiosInstance.post<AIResponse<GenerateBlogResponse>>(
      endPoints.ai.generateBlog,
      { topic, instructions },
    );
    return response.data;
  },
};

export default aiService;
