import { Button, Link } from "@nextui-org/react";
import MainTopBnr from "@/components/main/MainTopBnr";
import Gnb from "@/components/Gnb";
import SearchBox from "@/components/SearchBox";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { headerFixedState, moMenuOpenState, moMenuTabState } from "@/lib/recoilAtoms";
import { useEffect } from "react";

export default function Header() {
  const handleTest = (e) => {
    e.preventDefault();
    alert(`준비중입니다. 😊`);
  };

    const router = useRouter();
    const [moMenuOpen, setmoMenuOpen] = useRecoilState(moMenuOpenState);
    const [headerFixed, setHeaderFixed] = useRecoilState(headerFixedState);
    const [moMenuTab, setMoMenuTabState] = useRecoilState(moMenuTabState);

    const handleButtonClick = () => {
      setmoMenuOpen(!moMenuOpen);
    };

    const consultClick = () => {
      router.push('/consult');
    };

    const moMenuTabClick = (index: number) => {
      setMoMenuTabState(index);
    };

    useEffect(() => {
      const handleScroll = () => {
        const currentScroll = window.scrollY;
        const topBnrTop = document.getElementById('mainTopBnr').clientHeight;

        if (currentScroll > topBnrTop) {
          setHeaderFixed(true);
        } else {
          setHeaderFixed(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);



    return (
      <>
        <MainTopBnr/>
        <header id="header" className="px-0 m-auto ax-w-full h-[10rem] relative z-[40]">
          <div className={`${headerFixed ? 'fixed top-0 left-0 z-40' : 'relative'} flex-col w-full bg-white max-w-full px-0 border-b-1`}>
            <div className="w-full bg-[#27272E] h-[2.5rem]">
              <ul className="flex items-center h-full wrap">
                <li className="min-w-[4.5rem] h-full cursor-pointer border-x-1 border-slate-400 bg-primary"><Link href="/" className="block w-full h-full text-center px-2 py-1.5 text-white">IT</Link></li>
                <li className="min-w-[4.5rem] h-full cursor-pointer border-r-1 border-slate-400"><Link href="/" onClick={handleTest} className="block w-full h-full text-center px-2 py-1.5 text-white">그래픽</Link></li>
              </ul>
            </div>
            <div className="flex wrap items-center justify-between w-full max-w-[1440px] h-[4rem] py-3">
              <div className="flex items-center">
                <h1 className="mr-10 grow-0">
                  <Link href="/" className="block w-[10rem]"><img src="/src/images/hc_logo_2.svg"/></Link>
                </h1>
                <SearchBox />
              </div>
              <div>
                <Button onClick={consultClick} variant="flat" className="hidden text-white lg:block bg-zinc-700">
                  온라인 상담
                </Button>
                <button
                  className="flex items-center justify-center w-6 h-full outline-none lg:hidden group rounded-small tap-highlight-transparent"
                  type="button"
                  onClick={handleButtonClick}
                >
                  <span className="w-full h-full pointer-events-none flex flex-col items-center justify-center text-inherit before:content-[''] before:block before:h-px before:w-6 before:bg-current before:-translate-y-1 before:rotate-0 after:content-[''] after:block after:h-px after:w-6 after:bg-current after:translate-y-1 after:rotate-0"></span>
                </button>
              </div>
            </div>
            <div className="flex items-center lg:pb-2 lg:wrap h-[3.5rem]">
              <Gnb />
            </div>
          </div>
        </header>
        <div className={`${moMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-150 ease-in-out fixed top-0 left-0 w-full h-[100%] z-50`}>
          <div className="w-[85%] h-full bg-white">
            <div className="px-3 items-center justify-between flex h-[4rem] bg-white">
              <Link href="#" className="flex items-center">
                <span className="mr-1 text-4xl text-primary"><i className="xi-profile" /></span>
                <span className="text-base font-bold text-black">로그인</span>
              </Link>
              <button
                className="flex items-center justify-center w-6 h-full outline-none group rounded-small tap-highlight-transparent"
                type="button"
                onClick={handleButtonClick}
              >
                <span className="w-full h-full pointer-events-none flex flex-col items-center justify-center text-inherit before:content-[''] before:block before:h-px before:w-6 before:bg-current before:translate-y-px before:rotate-45 after:content-[''] after:block after:h-px after:w-6 after:bg-current after:translate-y-0 after:-rotate-45"></span>
              </button>
            </div>
            <ul className="items-center text-center justify-between flex h-[3rem] border-b-1 border-t-1">
              <li className="w-1/2 h-full bg-white">
                <Link href="/consult" className="block w-full h-full text-base/[3rem] font-bold text-primary">
                  상담신청
                </Link>
              </li>
              <li className="w-1/2 h-full bg-primary">
                <Link href="#" onClick={handleTest} className="block w-full h-full text-base/[3rem] font-bold text-white">
                  고객센터
                </Link>
              </li>
            </ul>
            <div className="flex h-[calc(100%-4rem)]">
              <ul className="w-2/5 bg-[#f8f8f8] h-[100%] py-2">
                <li onClick={() => moMenuTabClick(0)} className="flex w-full py-1 font-bold cursor-pointer text-lg/none">
                  <span 
                    className={`${moMenuTab==0 ? 'after:z-[-1] after:w-[calc(100%-0.5rem)] after:h-full after:bg-primary after:rounded-l-lg after:rounded-t-lg after:absolute after:top-0 after:left-0 text-white' : 'text-black'} relative z-10 block w-full px-3 py-3`}>
                    프로그래밍1
                  </span>
                </li>
                <li onClick={() => moMenuTabClick(1)} className="flex w-full py-1 font-bold cursor-pointer text-lg/none">
                  <span 
                    className={`${moMenuTab==1 ? 'after:z-[-1] after:w-[calc(100%-0.5rem)] after:h-full after:bg-primary after:rounded-l-lg after:rounded-t-lg after:absolute after:top-0 after:left-0 text-white' : 'text-black'} relative z-10 block w-full px-3 py-3`}>
                    프로그래밍2
                  </span>
                </li>
              </ul>
              {moMenuTab === 0 && 
                <ul id="menu01" className="w-3/5 h-full px-2 py-3 bg-white">
                  <li>
                    <Link href="/detail" className="block px-2 py-3 text-base text-black">프론트엔드</Link>
                  </li>
                  <li>
                    <Link href="/detail" className="block px-2 py-3 text-base text-black">프론트엔드</Link>
                  </li>
                  <li>
                    <Link href="/detail" className="block px-2 py-3 text-base text-black">프론트엔드</Link>
                  </li>
                  <li>
                    <Link href="/detail" className="block px-2 py-3 text-base text-black">프론트엔드</Link>
                  </li>
                </ul>
              }
              {moMenuTab === 1 && 
                <ul id="menu01" className="w-3/5 h-full px-2 py-3 bg-white">
                  <li>
                    <Link href="/detail" className="block px-2 py-3 text-base text-black">백엔드</Link>
                  </li>
                  <li>
                    <Link href="/detail" className="block px-2 py-3 text-base text-black">백엔드</Link>
                  </li>
                  <li>
                    <Link href="/detail" className="block px-2 py-3 text-base text-black">백엔드</Link>
                  </li>
                  <li>
                    <Link href="/detail" className="block px-2 py-3 text-base text-black">백엔드</Link>
                  </li>
                </ul>
              }
            </div>
          </div>
        </div>
        <div className={`${moMenuOpen ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-[100%] bg-black/80 z-[49]`}></div>
      </>
    );
  }