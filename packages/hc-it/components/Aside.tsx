import Consult from "@/pages/consult";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Aside() {
  const [asideHidden, setAsideHidden] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 0) {
        setAsideHidden(false);
      } else {
        setAsideHidden(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <aside id="aside" className={`fixed z-50 right-20 bottom-20 transition-all ${asideHidden ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center justify-center w-12 h-12 text-white rounded-full text-2xl/none bg-primary">
          <Link href="/consult" as="/consult">
            <i className="xi-call"/>
          </Link>
        </div>
        <div className="flex items-center justify-center text-3xl/none w-12 h-12 mt-3 text-black rounded-full bg-[#ffe839]">
          <Link href="">
            <i className="xi-kakaotalk"/>
          </Link>
        </div>
        <div className="flex items-center justify-center w-12 h-12 mt-3 text-white bg-black rounded-full text-2xl/none">
          <button onClick={scrollToTop}>
            <i className="xi-angle-up"/>
          </button>
        </div>
      </aside>
    </>
  );
}