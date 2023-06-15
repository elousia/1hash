export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="px-6 flex items-center text-sm bg-[#f8f7f7] hover:bg-[#f3f1f1] transition-all duration-150 ease-in-out py-3 rounded-full"
    >
      {children}
    </button>
  );
}
