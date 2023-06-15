import Button from "@/components/button";
import { Icons } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center max-w-3xl px-8 mx-auto sm:min-h-screen sm:px-0">
      <div className="text-center -mt-28">
        <h2 className="py-4 text-5xl font-bold tracking-tight capitalize text-center text-transparent bg-gradient-to-b bg-clip-text from-zinc-900/20 to-zinc-600/50 sm:text-7xl">
          Safely exchange environment variables
        </h2>
        <p className="">
          Safeguarded within your browser, your document undergoes encryption
          prior to storage for a restricted duration, ensuring secure read
          operations. Rest assured, unencrypted data remains exclusively within
          your browser environment.
        </p>
        <div className="my-7 flex justify-center">
          {/* <button
            type="button"
            className="px-6 flex items-center text-sm bg-[#f8f7f7] hover:bg-[#f3f1f1] transition-all duration-150 ease-in-out py-3 rounded-full"
          >
          </button> */}
          <Button>
            <Icons.key className="mr-1 h-4 w-4" />
            Sign in with Passage
          </Button>
        </div>
      </div>
    </section>
  );
}
