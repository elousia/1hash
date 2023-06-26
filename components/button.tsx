export default function Button({
  children,
  classes,
  props,
}: {
  children: React.ReactNode;
  classes?: string;
  props?: any;
}) {
  return (
    <button
      type="button"
      {...props}
      className={`px-6 flex items-center text-sm bg-[#f3f1f1] hover:bg-[#e8e8e8]  transition-all duration-150 ease-in-out py-3 rounded-full ${classes}`}
    >
      {children}
    </button>
  );
}
