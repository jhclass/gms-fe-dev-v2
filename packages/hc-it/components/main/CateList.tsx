import ListSlider from "@/components/ListSlider";

export default function CateList({cate, slideNo}) {
    return (
      <>
        <div className="wrap">
          {/* <span className="px-2 py-1 font-light text-center text-white rounded-r-lg rounded-tl-lg text-xs/xs bg-primary">New</span> */}
          <h2 className="mt-2 text-3xl font-bold">{cate} 강좌</h2>
          <p className="mt-1 text-base text-zinc-600">H-Class만의 특별한 강의</p>
          <div className="mt-5">
            <ListSlider slideNo={slideNo} />
          </div>
        </div>
       </>
    );
  }