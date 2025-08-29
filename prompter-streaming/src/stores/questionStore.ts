import {create} from "zustand";
import {persist} from "zustand/middleware";

import {Question} from "../types";
import {cleanupChannel} from "../helpers/cleanupChannel";

interface QuestionStore {
  questions: Question[];
  addQuestion: (question: Question) => void;
  clearQuestions: () => void;
}

const questionChannel =
  typeof window !== "undefined" ? new BroadcastChannel("question-store") : null;

let isProcessingExternalMessage = false;

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", cleanupChannel(questionChannel));
}

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set) => ({
      questions: [],
      addQuestion: (q: Question) => {
        set((state) => ({questions: state.questions.concat(q)}));

        if (!isProcessingExternalMessage) {
          questionChannel?.postMessage({
            type: "ADD_QUESTION",
            question: q,
          });
        }
      },
      clearQuestions: () => {
        set({questions: []});

        if (!isProcessingExternalMessage) {
          questionChannel?.postMessage({
            type: "CLEAR_QUESTIONS",
          });
        }
      },
    }),
    {
      name: "question-storage",
    },
  ),
);

interface QuestionMessage {
  type: "ADD_QUESTION" | "CLEAR_QUESTIONS";
  question: Question | null;
}

if (questionChannel) {
  questionChannel.onmessage = (event) => {
    console.log(event);
    const {type, question} = event.data as QuestionMessage;

    isProcessingExternalMessage = true;

    switch (type) {
      case "ADD_QUESTION":
        useQuestionStore.setState((state) => ({
          questions: state.questions.concat(question as Question),
        }));
        break;
      case "CLEAR_QUESTIONS":
        useQuestionStore.setState({questions: []});
        break;
    }

    isProcessingExternalMessage = false;
  };
}
