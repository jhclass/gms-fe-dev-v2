import { Link } from "@nextui-org/react";

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
          <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-2">
            {list.map((item, index) => (
              <div key={index}>
                <Link href="/" className="block">
                  <img alt={item.title} src={item.img} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }