import {create} from "zustand";
import {persist} from "zustand/middleware";

import {cleanupChannel} from "../helpers/cleanupChannel";

interface SelectedQuestionStore {
  selectedQuestionId: null | string;
  toggleSelectQuestion: (id: string) => void;
}

const selectChannel =
  typeof window !== "undefined" ? new BroadcastChannel("select-question-store") : null;

let isProcessingExternalMessage = false;

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", cleanupChannel(selectChannel));
}

export const useSelectQuestionStore = create<SelectedQuestionStore>()(
  persist(
    (set) => ({
      selectedQuestionId: null,
      toggleSelectQuestion: (id: string) => {
        set((state) => ({
          selectedQuestionId: state.selectedQuestionId === id ? null : id,
        }));
        if (!isProcessingExternalMessage) {
          selectChannel?.postMessage({
            type: "TOGGLE_SELECT",
            id: id,
          });
        }
      },
    }),
    {
      name: "selected-question-storage",
    },
  ),
);

interface SelectMessage {
  type: "TOGGLE_SELECT";
  id: string;
}

if (selectChannel) {
  selectChannel.onmessage = (event) => {
    const {type, id} = event.data as SelectMessage;

    if (type === "TOGGLE_SELECT") {
      isProcessingExternalMessage = true;

      const currentState = useSelectQuestionStore.getState();
      const newSelectedId = currentState.selectedQuestionId === id ? null : id;

      useSelectQuestionStore.setState({selectedQuestionId: newSelectedId});

      isProcessingExternalMessage = false;
    }
  };
}
