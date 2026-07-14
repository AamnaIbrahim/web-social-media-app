export default function RightSidebar({ children }) {
  return (
    <aside
      className="
        hidden xl:flex flex-col
        sticky top-16 h-[calc(100vh-4rem)]
        w-80 shrink-0
        px-4 py-6
        border-l border-border
        overflow-y-auto scrollbar-hide
        gap-4
      "
    >
      {children}
    </aside>
  );
}