import Link from "next/link";
import TopBnr from "@/components/TopBnr";

export default function Header() {
  return (
    <>
        <TopBnr/>
        <header className="bg-white">
          <div className="wrap">
          <div className="flex items-center justify-between p-6 mx-auto" aria-label="Global">
              <div className="flex lg:flex-1">
                <Link href="#" className="-m-1.5 p-1.5">
                <h1>LOGO | HighClass</h1>
            </Link>
            </div>
              <div className="flex">
                {/* <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                </button> */}
                <a href="#" className="px-2 py-1 mr-1.5 text-sm font-semibold leading-6 text-gray-900">
                  Log in
                </a>
                <a href="#" className="px-2 py-1 text-sm font-semibold leading-6 text-white bg-indigo-600 rounded hover:bg-black">
            Sign up
            </a>
          </div>
            </div>
          </div>
        </header>
      </>
    );
}