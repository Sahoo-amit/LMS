export const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-zinc-200 rounded-lg h-40 animate-pulse duration-100"
        ></div>
      ))}
    </div>
  );
};
