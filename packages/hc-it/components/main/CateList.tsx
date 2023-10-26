import ListSlider from "@/components/ListSlider";
import MainTitle from "@/components/MainTitle";

export default function CateList({cate, slideNo}) {
    return (
      <>
        <div className="wrap">
          <MainTitle title={`${cate} 강좌`} subs={'H-Class만의 특별한 강의👌'}/>
        </div>
        <div className="mt-5">
          <ListSlider slideNo={slideNo} />
        </div>
       </>
    );
  }