import { Link } from "@nextui-org/react";
import MainTitle from "@/components/MainTitle";

export default function MainBnr() {
  const list = [
    {
      title: "프론트엔드 로드맵 마스터",
      img: "/src/images/card01.jpg",
    },
    {
      title: "딥러닝, 인공지능 시그니처",
      img: "/src/images/card02.jpg",
    },
    {
      title: "완성하는 백엔드 웹 개발",
      img: "/src/images/card03.jpg",
    },
    {
      title: "우아한형제들 기술이사 김민태의 프론트엔드 아카데미",
      img: "/src/images/card04.jpg",
    },
  ];
    return (
      <>
        <div className="wrap">
          <MainTitle title={'EVENT 😍'}/>
          <div className="grid grid-cols-2 mt-5 lg:grid-cols-4 sm:grid-cols-2">
            {list.map((item, index) => (
              <div key={index}>
                <Link href="/" className="block">
                  <img alt={item.title} src={item.img} width="100%"/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }