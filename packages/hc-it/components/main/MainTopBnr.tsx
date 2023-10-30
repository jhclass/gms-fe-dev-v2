import { topbnrHiddenState } from "@/lib/recoilAtoms";
import { useRecoilState } from "recoil";

export default function TopBnr() {
  const [topbnrHidden, setTopbnrHidden] = useRecoilState(topbnrHiddenState);

  const opBnrClick = () => {
    setTopbnrHidden(!topbnrHidden);
  };

  return (
    <>
      <div id="mainTopBnr" className={`${topbnrHidden ? 'hidden' : 'block'}`}>
        <div className="relative isolate flex justify-center items-center gap-x-6 overflow-hidden bg-black px-6 py-2.5 sm:px-3.5">
          <div className="flex flex-wrap items-center flex-3 gap-x-4 gap-y-2 max-width-web">
            <p className="text-lg text-white">
              <strong className="font-semibold">H-Class 2023 | </strong>
              새로운 IT 
            </p>
            <a
              href="/consult"
              className="flex items-center justify-center rounded-full bg-white px-3.5 py-2 font-semibold text-gray-900 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              <span className="text-base">Click me</span>
              <i className="xi-long-arrow-right" />
            </a>
          </div>
          <div className="absolute top-0 flex justify-end h-full right-2 ">
            <button type="button" onClick={opBnrClick}  className="w-10 h-full flex justify-center items-center focus-visible:outline-offset-[-4px]">
              <span className="text-white text-3xl/none"><i className="align-middle xi-close-min"/></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}