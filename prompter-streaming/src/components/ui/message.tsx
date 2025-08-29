import {useCallback} from "react";

import {useSelectQuestionStore} from "../../stores/useSelectQuestionStore";
import {Question} from "../../types";
import {IconsMessage} from "../icons";

interface MessageProps {
  user: Question;
  isSelected: boolean;
}

export function Message({user, isSelected}: MessageProps) {
  const toggleSelectQuestion = useSelectQuestionStore((state) => state.toggleSelectQuestion);

  const handleClick = useCallback(() => {
    toggleSelectQuestion(user.id);
  }, [toggleSelectQuestion, user.id]);

  return (
    <div
      aria-labelledby="hs-toast-soft-color-dark-label"
      className={`max-w-lg rounded-lg border ${isSelected ? "border-teal-200 bg-teal-100" : "border-gray-200 bg-gray-100"} p-2 text-sm text-gray-800`}
      role="alert"
      style={{cursor: "pointer"}}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <IconsMessage />
        <h3 className="text-lg font-bold">{user.user}</h3>
      </div>

      <div className="text-md mt-2 ps-1">{user.question}</div>
    </div>
  );
}
