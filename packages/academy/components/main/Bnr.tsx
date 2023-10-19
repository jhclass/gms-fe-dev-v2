import { Link } from "@nextui-org/react";

export default function Bnr() {
  const list = [
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "/src/images/long02.jpg",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "/src/images/long01.jpg",
    },
  ];
    return (
      <>
        <div className="bg-[#e7eef4]">
          <div className="wrap relative z-10 grid grid-cols-1 lg:grid-cols-2 after:absolute after:w-full after:h-full after:top-0 after:z-[-1] after:right-[-50%] after:bg-[#370409]">
            <div>
              <Link href="/" className="block">
                <img alt="배너2" src="/src/images/long02.jpg" className="w-full"/>
              </Link>
            </div>
            <div>
              <Link href="/" className="block">
                <img alt="배너1" src="/src/images/long01.jpg" className="w-full"/>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }