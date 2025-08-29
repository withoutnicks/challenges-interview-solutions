import {FormEvent} from "react";

import {Message} from "../components/ui/message";
import {Question} from "../types";
import {useQuestionStore} from "../stores/questionStore";
import {useSelectQuestionStore} from "../stores/useSelectQuestionStore";

import {Footer} from "./views/footer";
import {Header} from "./views/header";
import {LayoutPage} from "./views/layout";

export function ControllerPage() {
  const questions = useQuestionStore((state) => state.questions);
  const selectedQuestion = useSelectQuestionStore((state) => state.selectedQuestionId);

  const addQuestion = useQuestionStore((state) => state.addQuestion);
  const clearQuestions = useQuestionStore((state) => state.clearQuestions);

  function handleAddQuestion(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const _form = new FormData(evt.currentTarget);
    const _name = _form.get("txtName") as string;
    const _question = _form.get("txtQuestion") as string;

    if (_name.trim().length === 0 || _question.trim().length === 0) return;

    const newQuestion = {
      id: String(Date.now()),
      user: _name,
      question: _question,
    } satisfies Question;

    addQuestion(newQuestion);
    evt.currentTarget.reset();
  }

  return (
    <LayoutPage>
      <Header title="🤫 - Questions Mode" />

      <section className="flex gap-8 py-8">
        <form className="flex w-1/3 flex-col gap-4" onSubmit={handleAddQuestion}>
          <label htmlFor="txtName">User</label>
          <input
            required
            className="peer block w-full rounded-lg border-transparent bg-gray-100 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm"
            id="txtName"
            name="txtName"
            placeholder="Gerardo"
            type="text"
          />
          <label htmlFor="txtQuestion">Question</label>
          <textarea
            required
            className="block w-full resize-none rounded-lg border-transparent bg-gray-100 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:px-4 sm:py-3 sm:text-sm"
            id="txtQuestion"
            name="txtQuestion"
            placeholder="What is your name?"
            rows={12}
          />
          <button className="focus:outline-hidden inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-100 px-4 py-3 text-sm font-medium text-blue-800 hover:bg-blue-200 focus:bg-blue-200 disabled:pointer-events-none disabled:opacity-50">
            Send question
          </button>
        </form>

        <div className="divider lg:divider-horizontal" />

        <aside className="flex w-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">📑 - Questions</h2>
            {questions.length > 0 && (
              <button
                className="shadow-2xs focus:outline-hidden inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
                onClick={clearQuestions}
              >
                Limpiar
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {questions.length === 0 ? (
              <p className="italic">No questions yet</p>
            ) : (
              questions.map((q) => (
                <Message key={q.id} isSelected={selectedQuestion === q.id} user={q} />
              ))
            )}
          </div>
        </aside>
      </section>

      <Footer />
    </LayoutPage>
  );
}
