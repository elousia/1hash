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
      className={`px-6 flex items-center text-sm bg-[#eeeeee] hover:bg-[#e8e8e8] transition-all duration-150 ease-in-out py-3 rounded-md ${classes}`}
    >
      {children}
    </button>
  );
}
