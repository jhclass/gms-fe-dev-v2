import WideSlider from "@/components/WideSlider";
import SquareCard from "@/components/SquareCard";
import CardBnr from "@/components/CardBnr";

export default function Home() {
  return (
    <>
      <WideSlider/>
      <div>
        <div className="wrap pt-[40px]">
          <h2 className="text-t1">현재 모집중이예요</h2>
          <p className="text-sub1">지금 결제하면 20만원 추가 할인!</p>
          <div className="mt-[40px]">
            <SquareCard/>
          </div>
        </div>
      </div>
      <div></div>
      <div>
        <div className="wrap pt-[40px]">
          <CardBnr />
        </div>
      </div>
    </>
  );
}
