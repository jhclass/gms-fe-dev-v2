export default function Header() {
    return (
      <>
        <div>
            <img 
                className="w-full object-cover align-bottom"
                src="https://placehold.it/500x500"
                style={{ borderRadius: 10, overflow: "hidden" }}
            />
            <h3 className="text-xl font-semibold mt-10 px-1.5">JAVASCRIPT 마스터 과정 (6개월)</h3>
            <p className="leading-relaxed mt-10 px-1.5">최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.</p>
        </div>
      </>
    );
  }