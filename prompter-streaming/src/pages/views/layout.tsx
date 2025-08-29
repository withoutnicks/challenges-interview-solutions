interface LayoutProps {
  children: React.ReactNode;
}

export function LayoutPage({children}: LayoutProps) {
  return (
    <main className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
      {children}
    </main>
  );
}
