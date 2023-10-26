import Link from "next/link";

export default function TopBnr() {
    return (
      <>
        <div id="topBnr">
          <div className="relative isolate flex justify-center items-center gap-x-6 overflow-hidden bg-black px-6 py-2.5 sm:px-3.5">
            <div className="flex flex-wrap items-center flex-3 gap-x-4 gap-y-2 max-width-web">
              <Link href="">
              </Link>
            </div>
            <div className="flex justify-end absolute right-2 top-[50%] -mt-3">
              <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
                <span className="sr-only">Dismiss</span>
                <span className="w-5 h-5 text-white"><i className="xi-close-min"/></span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }