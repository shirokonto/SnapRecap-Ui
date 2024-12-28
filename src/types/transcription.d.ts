// src/types/transcription.d.ts
export type TranscriptionChunk = {
  index: number;
  start_time: string;
  end_time: string;
  text: string;
};
