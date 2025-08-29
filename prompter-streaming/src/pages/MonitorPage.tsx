import {useMemo} from "react";

import {Message} from "../components/ui/message";
import {useQuestionStore} from "../stores/questionStore";
import {useSelectQuestionStore} from "../stores/useSelectQuestionStore";

export function MonitorPage() {
  const questions = useQuestionStore((state) => state.questions);
  const selectedQuestionId = useSelectQuestionStore((state) => state.selectedQuestionId);

  const memoSelectedQuestion = useMemo(() => {
    if (!selectedQuestionId) return null;

    return questions.find((q) => q.id === selectedQuestionId);
  }, [questions, selectedQuestionId]);

  return (
    <div className="pointer-events-none fixed inset-0 bg-transparent">
      <div className="absolute bottom-8 left-8 max-w-md">
        {memoSelectedQuestion && (
          <Message key={memoSelectedQuestion.id} isSelected user={memoSelectedQuestion} />
        )}
      </div>
    </div>
  );
}
