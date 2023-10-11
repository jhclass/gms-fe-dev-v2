import WideSlider from "@/components/WideSlider";
import SquareCard from "@/components/SquareCard";


// const MContents = styled.div`
//   display: flax;
//   align-items: center;
//   justify-content: center;
//   margin: 50px 0;
//   flex-direction: column;
// `;
// const MContentsTitle = styled.h2`
//   font-size: 30px;
//   font-weight: 600;
// `;

// const McontentsSubText = styled.p`
//   margin: 20px 0 50px;
// `;

// const GridContainer = styled.div`
//   width: 100%;
//   display: grid;
//   grid-gap: 16px;
//   grid-template-columns: repeat(4, 1fr);
// `;

const mainList = ['con1','con2','con3','con4','con5','con6','con7','con8'];

export default function Home() {
  return (
    <>
      <WideSlider/>
      <div>
        <div className="wrap">
          <h2>현재 모집중이예요</h2>
          <p>지금 결제하면 20만원 추가 할인!</p>
          <div className="w-full grid grid-cols-4 gap-16">
            {mainList.map((item, index) => {
              return <SquareCard key={index}/>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
