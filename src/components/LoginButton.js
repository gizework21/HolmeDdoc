import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function LoginButton({ title, options }) {
  return (
    <div className="w-full">
      <div className="mx-auto w-full  max-w-5xl bg-inherit p-2 border-b">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-center px-4 py-2 text-center text-sm text-primary focus:outline-none lg:font-semibold rounded-none">
                {/* <span className="text-xl">{title}</span> */}
                <button className="text-center">Log in </button>
                <ChevronUpIcon
                  className={`${
                    !open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-primary`}
                />
              </Disclosure.Button>
              {open && (
                <Disclosure.Panel className="px-4 py-3 text-md text-primary">
                  <div className="flex justify-center items-center flex-col space-y-2">
                    <button className="border-primary border-[1px] py-2 w-full  hover:bg-primary hover:text-white">
                      Log in with Google{" "}
                    </button>
                    <button className="border-primary border-[1px] py-2 w-full  hover:bg-primary hover:text-white">
                      Log in with Facebook{" "}
                    </button>
                    <button className="border-primary border-[1px] py-2 w-full  hover:bg-primary hover:text-white mb-20">
                      Log in with Apple{" "}
                    </button>
                    <div className="border-black border-[1px] w-[48%] h-0">
                      or
                    </div>

                    <div className="flex flex-col w-full mt-5 space-y-4">
                      <div className="border-primary border-[1px] w-full  ">
                        <input
                          type="text"
                          placeholder="Email address"
                          className="w-full p-2"
                        />
                      </div>
                      <div className="border-primary border-[1px] w-full ">
                        <input
                          type="password"
                          placeholder="password"
                          className="w-full p-2"
                        />
                      </div>
                      <div className="bg-yellowcustom py-3 w-full text-center ">
                        <button className="mx-4">Log in</button>
                      </div>
                      <div className="text-blue-500">
                        <p className="mt-2">Forgot your password?</p>{" "}
                        <p className="mt-4">
                          New to Zocdoc? Create an account{" "}
                        </p>
                        <p className="mt-4">Provider login</p>
                      </div>
                    </div>
                  </div>
                </Disclosure.Panel>
              )}
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
