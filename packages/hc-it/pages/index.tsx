import WideSlider from "@/components/main/WideSlider";
import Ranking from "@/components/main/Ranking";
import New from "@/components/main/New";
import MainBnr from "@/components/main/MainBnr";
import Bnr from "@/components/main/Bnr";
import CateList from "@/components/main/CateList";
import Info from "@/components/main/Info";
import Form from "@/components/Form";
import QuickMenu from "@/components/main/QuickMenu";

export default function Home() {
  return (
    <>
      <WideSlider />
      <div className="hidden border-b lg:block">
        <QuickMenu />
      </div>
      <div className="mt-20">
        <New />
      </div>
      <div className="mt-20">
        <Bnr />
      </div>
      <div className="mt-20">
        <Ranking />
      </div>
      <div className="py-20 mt-20 bg-slate-200">
        <MainBnr />
      </div>
      <div className="mt-20">
        <CateList cate={"근로자"} slideNo={1} />
      </div>
      <div className="mt-20">
        <CateList cate={"실업자"} slideNo={2} />
      </div>
      <div className="py-20">
        <Info />
      </div>
    </>
  );
}
