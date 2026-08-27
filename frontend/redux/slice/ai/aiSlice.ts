import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import aiService from "@/api/services/aiService";
import type { AIUsage, GenerateBlogResponse } from "@/api/services/aiService";

interface AIState {
  answer: string | null;
  summary: string | null;
  summaryCached: boolean;
  questionUsage: AIUsage | null;
  summaryUsage: AIUsage | null;
  generationUsage: AIUsage | null;
  loading: boolean;
  error: string | null;
  errorStatus: number | null;
}

const initialState: AIState = {
  answer: null,
  summary: null,
  summaryCached: false,
  questionUsage: null,
  summaryUsage: null,
  generationUsage: null,
  loading: false,
  error: null,
  errorStatus: null,
};

const getErrorDetails = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as {
      response?: { status?: unknown; data?: { message?: unknown } };
    }).response;
    return {
      message: typeof response?.data?.message === "string" ? response.data.message : fallback,
      status: typeof response?.status === "number" ? response.status : null,
    };
  }
  return { message: fallback, status: null };
};

const formatError = (error: unknown, fallback: string) => {
  const details = getErrorDetails(error, fallback);
  if (details.status === 401) return "Please log in to use AI features.";
  if (details.status === 403) return details.message || "You do not have permission to use this AI feature.";
  if (details.status === 429) return details.message || "AI rate limit exceeded. Please try again later.";
  return details.message;
};

type AIRejectValue = { message: string; status: number | null };

export const askAboutBlog = createAsyncThunk<
  { answer: string | null; usage: AIUsage },
  { blogId: string; question: string },
  { rejectValue: AIRejectValue }
>("ai/askAboutBlog", async ({ blogId, question }, { rejectWithValue }) => {
  try {
    return (await aiService.askAboutBlog(blogId, question)).data;
  } catch (error: unknown) {
    return rejectWithValue({ message: formatError(error, "Failed to get an AI answer"), status: getErrorDetails(error, "").status });
  }
});

export const summarizeBlog = createAsyncThunk<
  { summary: string | null; cached: boolean; usage?: AIUsage },
  string,
  { rejectValue: AIRejectValue }
>("ai/summarizeBlog", async (blogId, { rejectWithValue }) => {
  try {
    return (await aiService.summarizeBlog(blogId)).data;
  } catch (error: unknown) {
    return rejectWithValue({ message: formatError(error, "Failed to summarize the article"), status: getErrorDetails(error, "").status });
  }
});

export const generateBlog = createAsyncThunk<
  GenerateBlogResponse,
  { topic: string; instructions?: string },
  { rejectValue: AIRejectValue }
>("ai/generateBlog", async ({ topic, instructions }, { rejectWithValue }) => {
  try {
    return (await aiService.generateBlog(topic, instructions)).data;
  } catch (error: unknown) {
    return rejectWithValue({ message: formatError(error, "Failed to generate the blog"), status: getErrorDetails(error, "").status });
  }
});

const clearRequestState = (state: AIState) => {
  state.error = null;
  state.errorStatus = null;
  state.answer = null;
  state.summary = null;
  state.summaryCached = false;
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    clearAIState: (state) => {
      clearRequestState(state);
      state.questionUsage = null;
      state.summaryUsage = null;
      state.generationUsage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(askAboutBlog.pending, (state) => { state.loading = true; clearRequestState(state); })
      .addCase(askAboutBlog.fulfilled, (state, action) => { state.loading = false; state.answer = action.payload.answer; state.questionUsage = action.payload.usage; })
      .addCase(askAboutBlog.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || "Failed to get an AI answer"; state.errorStatus = action.payload?.status || null; })
      .addCase(summarizeBlog.pending, (state) => { state.loading = true; clearRequestState(state); })
      .addCase(summarizeBlog.fulfilled, (state, action) => { state.loading = false; state.summary = action.payload.summary; state.summaryCached = action.payload.cached; state.summaryUsage = action.payload.usage || null; })
      .addCase(summarizeBlog.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || "Failed to summarize the article"; state.errorStatus = action.payload?.status || null; })
      .addCase(generateBlog.pending, (state) => { state.loading = true; state.error = null; state.errorStatus = null; })
      .addCase(generateBlog.fulfilled, (state, action) => { state.loading = false; state.generationUsage = action.payload.usage; })
      .addCase(generateBlog.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || "Failed to generate the blog"; state.errorStatus = action.payload?.status || null; });
  },
});

export const { clearAIState } = aiSlice.actions;
export default aiSlice.reducer;
