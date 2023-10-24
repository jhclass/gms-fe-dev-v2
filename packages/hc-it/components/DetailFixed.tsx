import Countdown from "@/components/Countdown";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function DetailFixed() {
  const [isSectionHidden, setIsSectionHidden] = useState(false);
  useEffect(() => {
    const sectionToHide = document.getElementById('btm_fixed');
    const windowHeight = window.innerHeight; // 창의 높이
    const documentHeight = document.documentElement.scrollHeight; // 스크롤 가능한 전체 문서 높이
    const totalScrollPosition = documentHeight - windowHeight;
    const footer = document.getElementById('footer');

    if (sectionToHide && footer) {
      const footerTop = footer.getBoundingClientRect().top;

      const handleScroll = () => {
        const currentScroll = window.scrollY;
        console.log(currentScroll);
        console.log(footerTop);
        console.log(totalScrollPosition);

        if (currentScroll >= footerTop) {
          // Footer가 시작하는 스크롤 위치에 도달하면 섹션을 숨깁니다.
          setIsSectionHidden(true);
        } else {
          // 그렇지 않으면 섹션을 다시 표시합니다.
          setIsSectionHidden(false);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  
  const scrollToConsult = () => {
    const consultSection = document.getElementById('consult');
    if (consultSection) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.clientHeight : 0;
      const consultSectionTop = consultSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: consultSectionTop - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <section id="btm_fixed" className={`fixed bottom-0 left-0 z-50 w-full py-5 ${isSectionHidden ? 'hidden' : 'visible'}`}>
        <div className="flex items-center justify-center">
          <div className="bg-[#222] text-[#aaaaaf] py-5 px-8 flex relative rounded-2xl items-center">
            <div className="flex items-center justify-between pr-[5rem]">
              <p className="flex flex-col justify-center flex-1 w-full pr-20 overflow-hidden">
                <strong className="text-xl">📣 마지막 10주년 특가를 놓치지 마세요! (~10/27)</strong>
                <span className="mt-2 line-clamp-1 max-w-[40rem]">상단 배너를 눌러 혜택을 확인해 보세요러 혜택해 보세요러 혜택해 보세요러 혜택해 보세요러 혜택해 보세요러 혜택해 보세요러 혜택해 보세요러 혜택을 확인해 보세요!</span>
              </p>
              <div className="mt-3">
                마감까지
                <Countdown targetDate={new Date('2023-12-25')} />
                남음
              </div>
            </div>
            <div className="text-[#aaaaaf]">
              <Button onPress={scrollToConsult} size="lg" variant="flat" className="text-white bg-[#c72835] rounded-lg">
                수강 신청 버튼
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}