import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function HamburgerAccordion({ title, options }) {
  return (
    <div className="w-full ">
      <div className="mx-auto w-full  max-w-5xl bg-inherit">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="cursor-pointer w-full flex items-center  text-left text-sm text-[#ffffff99] focus:outline-none  rounded-none">
                <span
                  //  className="text-xl"
                  className={`${
                    !open ? " mr-2 text-base " : " text-white  mr-2 text-base "
                  } `}
                >
                  {title}
                </span>
                <ChevronUpIcon
                  className={`${
                    !open ? "rotate-180 transform " : ""
                  } h-5 w-5 text-[#ffffff99]`}
                />
              </Disclosure.Button>
              {open && (
                <Disclosure.Panel className="  text-md text-[#ffffff99]">
                  {options.map((option) => (
                    <h1 className=" mt-4 cursor-pointer text-base">
                      {option.title}
                    </h1>
                  ))}
                </Disclosure.Panel>
              )}
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
