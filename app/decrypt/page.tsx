"use client";

import { useState } from "react";

import Button from "@/components/button";
import { Icons } from "@/components/icons";
import { Fragment } from "react";
import Select from "@/components/select";

export default function Decrypt() {
  const [text, setText] = useState("askdjfhi8o23u8ijoljf8ou3458otujpoiwef");
  const [placeholder] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <section className="flex flex-col items-center max-w-4xl justify-start mx-auto w-full sm:min-h-screen sm:px-0">
      <div className="text-center mt-10 w-full">
        <h2 className="py-4 text-5xl w-full font-bold tracking-tight capitalize text-center text-transparent bg-gradient-to-b bg-clip-text from-zinc-900/20 to-zinc-600/50 sm:text-5xl">
          Decrypt
        </h2>
        {placeholder ? (
          <pre className="px-4 py-3 mt-8 overflow-x-scroll font-mono w-full text-left bg-transparent border rounded border-zinc-400 focus:border-zinc-100/80 focus:ring-0 sm:text-sm text-zinc-100">
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
              <div>
                <pre className="flex overflow-x-auto">
                  <code className="px-4 text-left overflow-x-scroll text-gray-600">
                    {text}
                  </code>
                </pre>
              </div>
            </div>
          </pre>
        ) : (
          <form
            className="max-w-3xl mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              // onSubmit();
            }}
          >
            <div className="px-3 py-2 mt-8 border rounded border-zinc-600 focus-within:ring-0">
              <label
                htmlFor="id"
                className="block text-xs font-medium text-left text-zinc-500"
              >
                ID
              </label>
              <input
                type="text"
                name="compositeKey"
                id="compositeKey"
                placeholder="#*$lksdfjkasjdjDLKJKDJp343"
                className="w-full p-0 text-base focus:outline-0 bg-transparent border-0 appearance-none text-zinc-600 placeholder-zinc-400 focus:ring-0 sm:text-sm"
                defaultValue={
                  "DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres"
                }
              />
            </div>

            {/* <button
              type="submit"
              disabled={false}
              className={`mt-8 w-full h-12 inline-flex justify-center items-center  transition-all  rounded px-4 py-1.5 md:py-2 text-base font-semibold leading-7 text-zinc-800   bg-zinc-200 ring-1  duration-150  hover:text-black hover:drop-shadow-cta   hover:bg-white ${
                loading ? "animate-pulse" : ""
              }`}
            >
              <span>
                {loading ? (
                  <Icons.spinner className="w-5 h-5 animate-spin" />
                ) : (
                  "Decrypt"
                )}
              </span>
            </button> */}
            <div className="mt-10">
              <Button
                classes={`w-1/2 mx-auto flex items-center text-center justify-center ${
                  loading ? "animate-pulse" : ""
                }`}
              >
                {loading ? (
                  <Icons.spinner className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Icons.unlock className="w-4 h-4 mr-1" />
                    Decrypt
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        <div className="my-7 w-full flex justify-center items-center">
          <Button>
            <span className="flex items-center cursor-pointer">
              <Icons.copy className="mr-2 h-4 w-4" />
              Copy
            </span>
          </Button>

          <div className="ml-1">
            <Button>
              <Icons.key className="mr-2 h-4 w-4" />
              Encrypt
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
