import { detailTopbnrFixedState, detailTopbnrHiddenState } from "@/lib/recoilAtoms";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function TopBnr() {
  const [detailTopbnrFixed, setDetailTopbnrFixed] = useRecoilState(detailTopbnrFixedState);
  const [detailTopbnrHidden, setDetailTopbnrHidden] = useRecoilState(detailTopbnrHiddenState);

  const datailTopBnrClick = () => {
    setDetailTopbnrHidden(!detailTopbnrHidden);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const topBnrTop = document.getElementById('mainTopBnr').clientHeight;

      if (currentScroll > topBnrTop) {
        setDetailTopbnrFixed(true);
      } else {
        setDetailTopbnrFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div id="topBnr" className={`${detailTopbnrHidden ? 'hidden' : 'block'} h-[9.5rem]`}>
        <div className={`${detailTopbnrFixed ? 'fixed top-[10rem] left-0 z-40' : 'relative'} flex w-full items-center justify-center overflow-hidden bg-[#eee] isolate gap-x-6 h-[9.5rem]`}>
          <div className="flex flex-wrap items-center justify-center flex-3 gap-x-4 gap-y-2 wrap">
            <Link href="">
              <img src="/src/images/topbnr.jpg" alt="topbnr"/>
            </Link>
          </div>
          <div className="flex justify-end absolute right-2 top-[50%] -mt-[1rem]">
            <button type="button" onClick={datailTopBnrClick} className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
              <span className="w-5 h-5 text-3xl text-black"><i className="xi-close-min"/></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}