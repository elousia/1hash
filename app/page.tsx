import Button from "@/components/button";
import { Icons } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center max-w-3xl px- mx-auto sm:min-h-screen sm:px-0">
      <div className="text-center mt-24 sm:mt-0 lg:-mt-16">
        <h2 className="py-4 text-5xl font-bold tracking-tight capitalize text-center text-transparent bg-gradient-to-b bg-clip-text from-zinc-900/20 to-zinc-600/50 sm:text-7xl">
          Safely exchange environment variables
        </h2>
        <p className="">
          Safeguarded within your browser, your secret undergoes encryption
          prior to storage for a restricted duration, ensuring secure read
          operations. Rest assured, unencrypted data remains exclusively within
          your browser environment.
        </p>
        <div className="my-7 flex justify-center">
          <Button>
            <Icons.key className="mr-2 h-4 w-4" />
            Sign in with Passage
          </Button>
        </div>
      </div>
    </section>
  );
}
