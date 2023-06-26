"use client";

import { useState } from "react";

import Button from "@/components/button";
import { Icons } from "@/components/icons";
import { Fragment } from "react";
import Select from "@/components/select";

export default function Encrypt() {
  const [text, setText] = useState(
    "DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres"
  );
  return (
    <section className="flex flex-col items-center max-w-4xl justify-start mx-auto w-full sm:min-h-screen sm:px-0">
      <div className="text-center mt-10 w-full">
        <h2 className="py-4 text-5xl w-full font-bold tracking-tight capitalize text-center text-transparent bg-gradient-to-b bg-clip-text from-zinc-900/20 to-zinc-600/50 sm:text-5xl">
          Encrypt
        </h2>
        <pre className="px-4 py-3 mt-8 font-mono w-full text-left bg-transparent border rounded border-zinc-400 focus:border-zinc-100/80 focus:ring-0 sm:text-sm text-zinc-100">
          <div className="flex items-start px-1 text-sm w-full">
            <div
              aria-hidden="true"
              className="pr-4 font-mono border-r select-none border-zinc-300/5 text-zinc-700"
            >
              {Array.from({
                length: text.split("\n").length,
              }).map((_, index) => (
                <Fragment key={index}>
                  {(index + 1).toString().padStart(2, "0")}
                  <br />
                </Fragment>
              ))}
            </div>

            <textarea
              id="text"
              name="text"
              value={text}
              minLength={1}
              onChange={(e) => setText(e.target.value)}
              rows={Math.max(10, text.split("\n").length)}
              placeholder="DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres"
              className="w-full p-0 text-base bg-transparent border-0 appearance-none resize-none hover:resize text-zinc-600 focus:outline-none placeholder-zinc-500 focus:ring-0 sm:text-sm"
            />
          </div>
        </pre>
        <div className="my-7 w-full flex justify-center items-center">
          <Button>
            <label
              htmlFor="dropzone-file"
              className="flex items-center cursor-pointer"
            >
              <Icons.upload className="mr-2 h-4 w-4" />
              Upload a file
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </Button>

          <div className="mx-1">
            <Select />
          </div>

          <div className="ml-1">
            <Button>
              <Icons.share className="mr-2 h-4 w-4" />
              Share secret
            </Button>
          </div>
        </div>
        <div className="w-2/4 mx-auto">
          <Button classes="w-full flex items-center justify-center">
            <Icons.share className="mr-2 h-4 w-4" />
            Share secret
          </Button>
        </div>
      </div>
    </section>
  );
}
