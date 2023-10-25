import { Button, Input, Link } from "@nextui-org/react";
import TopBnr from "@/components/main/TopBnr";
import Gnb from "@/components/Gnb";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { headerFixedState, moMenuOpenState } from "@/lib/recoilAtoms";
import { useEffect } from "react";
// import Link from "next/link";

export default function Header() {
    const router = useRouter();

    const [headerFixed, setHeaderFixedState] = useRecoilState(headerFixedState);
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScroll = window.scrollY;
        const topBnrTop = document.getElementById('topBnr').clientHeight;

        if (currentScroll > topBnrTop) {
          setHeaderFixedState(true);
        } else {
          setHeaderFixedState(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    const [moMenuOpen, setmoMenuOpen] = useRecoilState(moMenuOpenState);
    const handleButtonClick = () => {
      setmoMenuOpen(!moMenuOpen);
    };
    const consultClick = () => {
      router.push('/consult');
    };

    return (
      <>
        <TopBnr/>
        <header id="header" className="px-0 m-auto ax-w-full">
          <div className={`${headerFixed ? 'fixed top-0 left-0 z-50' : 'relative'} flex-col w-full bg-white max-w-full px-0 border-b-1`}>
            <div className="w-full bg-[#27272E]">
              <ul className="flex items-center wrap">
                <li className="min-w-[4.5rem] cursor-pointer border-x-1 border-slate-400 bg-primary"><Link className="block w-full h-full text-center px-2 py-1.5 text-white">IT</Link></li>
                <li className="min-w-[4.5rem] cursor-pointer border-r-1 border-slate-400"><Link className="block w-full h-full text-center px-2 py-1.5 text-white">그래픽</Link></li>
              </ul>
            </div>
            <div className="">
              <div className="flex wrap items-center justify-between w-full max-w-[1440px] py-3">
                <div className="flex items-center">
                  <h1 className="mr-10 grow-0">
                    <Link href="/" className="block w-[10rem]"><img src="/src/images/hc_logo_1.svg"/></Link>
                  </h1>
                  <div className="hidden lg:block lg:w-[20rem]">
                    <Input
                      classNames={{
                        base: "max-w-full h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                      }}
                      fullWidth
                      placeholder="검색어를 입력해주세요"
                      size="sm"
                      startContent={<i className="xi-search"/>}
                      type="search"
                    />
                  </div>
                </div>
                <div>
                  <Button onClick={consultClick} variant="flat" className="hidden text-white lg:block bg-primary">
                    온라인 상담
                  </Button>
                  <button
                    className="flex items-center justify-center w-6 h-full outline-none lg:hidden group rounded-small tap-highlight-transparent"
                    type="button"
                    onClick={handleButtonClick} // 클릭 이벤트 핸들러 추가
                  >
                    <span className="w-full h-full pointer-events-none flex flex-col items-center justify-center text-inherit before:content-[''] before:block before:h-px before:w-6 before:bg-current before:-translate-y-1 before:rotate-0 after:content-[''] after:block after:h-px after:w-6 after:bg-current after:translate-y-1 after:rotate-0"></span>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center pb-3 wrap">
                <Gnb />
              </div>
            </div>
          </div>
        </header>
        <div className={`${moMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-150 ease-in-out fixed top-0 left-0 w-full h-[100%] z-50`}>
          <div className="w-[85%] h-full">
            <div className="px-3 items-center justify-between flex h-[4rem] bg-white">
              <Link href="#" className="flex items-center">
                <span className="mr-1 text-4xl text-primary"><i className="xi-profile" /></span>
                <span className="text-base font-bold text-black">로그인</span>
              </Link>
              <button
                className="flex items-center justify-center w-6 h-full outline-none group rounded-small tap-highlight-transparent"
                type="button"
                onClick={handleButtonClick} // 클릭 이벤트 핸들러 추가
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
                <Link href="/consult" className="block w-full h-full text-base/[3rem] font-bold text-white">
                  고객센터
                </Link>
              </li>
            </ul>
            <div className="flex h-[calc(100%-4rem)]">
              <ul className="w-2/5 bg-[#f8f8f8] h-[100%] py-2">
                <li className="flex w-full py-1 font-bold cursor-pointer text-lg/none">
                  <span className="relative z-10 block w-full px-3 py-3 text-white after:z-[-1] after:w-[calc(100%-0.5rem)] after:h-full after:bg-primary after:rounded-l-lg after:rounded-t-lg after:absolute after:top-0 after:left-0">
                    프로그래밍
                    </span>
                </li>
                <li className="flex w-full py-1 font-bold cursor-pointer text-lg/none">
                  <span className="relative z-10 block w-full px-3 py-3 text-black">
                    프로그래밍
                    </span>
                </li>
                <li className="flex w-full py-1 font-bold cursor-pointer text-lg/none">
                  <span className="relative z-10 block w-full px-3 py-3 text-black">
                    프로그래밍
                    </span>
                </li>
                <li className="flex w-full py-1 font-bold cursor-pointer text-lg/none">
                  <span className="relative z-10 block w-full px-3 py-3 text-black">
                    프로그래밍
                    </span>
                </li>
              </ul>
              <ul className="w-3/5 h-full px-2 py-3 bg-white">
                <li>
                  <Link href="#" className="block px-2 py-3 text-base text-black">프론트엔드</Link>
                </li>
                <li>
                  <Link href="#" className="block px-2 py-3 text-base text-black">프론트엔드</Link>
                </li>
                <li>
                  <Link href="#" className="block px-2 py-3 text-base text-black">프론트엔드</Link>
                </li>
                <li>
                  <Link href="#" className="block px-2 py-3 text-base text-black">프론트엔드</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`${moMenuOpen ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-[100%] bg-black/80 z-[49]`}></div>
      </>
    );
  }