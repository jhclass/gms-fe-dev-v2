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
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative w-full flex justify-end md:justify-center bg-[#e7eef4]">
            <Link href="/">
              <img alt="배너2" src="/src/images/long02.jpg" className="w-full"/>
            </Link>
          </div>
          <div className="relative w-full flex justify-start md:justify-center bg-[#370409]">
            <Link href="/">
              <img alt="배너1" src="/src/images/long01.jpg" className="w-full"/>
            </Link>
          </div>
        </div>
      </>
    );
  }