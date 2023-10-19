import Link from "next/link";

export default function Aside() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className="fixed z-50 right-20 bottom-20">
        <div className="flex items-center justify-center w-12 h-12 text-white rounded-full text-2xl/none bg-primary">
          <Link href="">
            <i className="xi-call"/>
          </Link>
        </div>
        <div className="flex items-center justify-center text-3xl/none w-12 h-12 mt-3 text-black rounded-full bg-[#ffe839]">
          <Link href="">
            <i className="xi-kakaotalk"/>
          </Link>
        </div>
        <div className="flex items-center justify-center w-12 h-12 mt-3 text-white bg-black rounded-full text-2xl/none">
          <button onClick={scrollToTop}>
            <i className="xi-angle-up"/>
          </button>
        </div>
      </div>
    </>
  );
}