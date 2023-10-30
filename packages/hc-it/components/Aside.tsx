import Link from "next/link";
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { asideHiddenState, moAsideOpenState } from '@/lib/recoilAtoms';

export default function Aside() {
  const handleTest = (e) => {
    e.preventDefault();
    alert(`준비중입니다. 😊`);
  };

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
      <aside id="aside" className={`${asideHidden ? 'opacity-0' : 'opacity-100'} bottom-[8rem] rounded-s-lg right-[1rem] fixed z-40 lg:py-0 lg:px-0 lg:bg-transparent lg:bottom-28 transition-all`}>
        <div className="flex items-center justify-center w-[3.2rem] h-[3.2rem] text-white rounded-full text-2xl/none bg-primary">
          <Link href="/consult" as="/consult">
            <i className="xi-call"/>
          </Link>
        </div>
        <div className="flex items-center justify-center text-3xl/none w-[3.2rem] h-[3.2rem] mt-3 text-black rounded-full bg-[#ffe839]">
          <Link href="#" onClick={handleTest}>
            <i className="xi-kakaotalk"/>
          </Link>
        </div>
        <div className="hidden lg:flex items-center justify-center w-[3.2rem] h-[3.2rem] mt-3 text-white bg-black rounded-full text-2xl/none">
          <button onClick={scrollToTop}>
            <i className="xi-angle-up"/>
          </button>
        </div>
      </aside>
    </>
  );
}