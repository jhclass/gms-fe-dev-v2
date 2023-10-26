import Link from "next/link";
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { asideHiddenState, moAsideOpenState } from '@/lib/recoilAtoms';

export default function Aside() {
  const [asideHidden, setAsideHiddenState] = useRecoilState(asideHiddenState);
  const [moAsideOpen, setMoAsideOpenState] = useRecoilState(moAsideOpenState);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 0) {
        setAsideHiddenState(false);
      } else {
        setAsideHiddenState(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAsideClick = () => {
    setMoAsideOpenState(!moAsideOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <>
      <aside id="aside" className={`${asideHidden ? 'opacity-0' : 'opacity-100'} ${moAsideOpen ? 'translate-x-0':'translate-x-[calc(100%+0.01rem)]'} bg-zinc-700/80 py-3 px-2 bottom-[5%] rounded-s-lg right-0 fixed z-50 lg:py-0 lg:px-0 lg:bg-transparent lg:right-16 xl:right-16 lg:bottom-28 transition-all`}>
        <span onClick={handleAsideClick} className="flex items-center cursor-pointer lg:hidden w-[2rem] h-[3rem] text-white text-4xl/none indent-[-0.05rem] rounded-s-lg bg-zinc-700/80 absolute top-[50%] mt-[-1.5rem] left-[-2rem]"><i className="xi-angle-left-min" /></span>
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