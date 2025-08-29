import {useStatusApp} from "../../helpers/statusApp";

interface HeaderProps {
  title: string;
}

export function Header({title}: HeaderProps) {
  const isRealTimeConnected = useStatusApp();

  return (
    <header className="flex items-center justify-between text-xl font-bold leading-[4rem]">
      {title}
      <div className="flex items-center gap-2">
        {isRealTimeConnected ? (
          <div>
            <span className="inline-flex items-center gap-x-1 rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">
              <svg
                className="size-3 shrink-0"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Connected
            </span>
          </div>
        ) : (
          <div>
            <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-1.5 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
              <svg
                className="size-3 shrink-0"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                <line x1="12" x2="12" y1="2" y2="12" />
              </svg>
              Offline
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
