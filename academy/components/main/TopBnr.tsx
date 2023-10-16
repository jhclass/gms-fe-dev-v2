
export default function TopBnr() {
    return (
      <>
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-black px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6 text-white">
            <strong className="font-semibold">H-Class 2023 | </strong>
            새로운 IT 
          </p>
          <a
            href="#"
            className="flex-none rounded-full bg-white px-3.5 py-1 text-sm font-semibold text-gray-900 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Click me<span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="flex justify-end flex-1">
          <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
            <span className="sr-only">Dismiss</span>
            <span className="w-5 h-5 text-white"><i className="xi-close-min"/></span>
          </button>
        </div>
      </div>
      </>
    );
  }