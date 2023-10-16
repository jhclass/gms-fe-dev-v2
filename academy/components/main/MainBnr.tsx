import { Link } from "@nextui-org/react";

export default function MainBnr() {
  const list = [
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/360x400",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/360x400",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/360x400",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/360x400",
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