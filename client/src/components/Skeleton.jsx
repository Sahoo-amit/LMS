import { ThemeStore } from "../store/ThemeStore";

export const CardSkeleton = () => {
  const theme = ThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`rounded-lg h-40 animate-pulse duration-100 ${
            isDark ? "bg-zinc-700" : "bg-zinc-200"
          }`}
        ></div>
      ))}
    </div>
  );
};
