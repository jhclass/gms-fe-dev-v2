import { Link } from "@nextui-org/react";

export default function MainBnr() {
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
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2">
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