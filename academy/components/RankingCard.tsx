import { Link } from "@nextui-org/react";

export default function RankingCard() {
  const list = [
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/500x500",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/500x500",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/500x500",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/500x500",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/500x500",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/500x500",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/500x500",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/500x500",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/500x500",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/500x500",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
  ];
    return (
      <>
        {list.map((item, index) => (
          <div key={index}>
            <Link href="/" className="block">
              <div className="relative overflow-hidden rounded-r-xl rounded-tl-xl">
                <p className="absolute bottom-0 left-0 w-10 h-10 text-center text-white rounded-r-lg rounded-tl-lg text-2xl/10 bg-primary">{index+1}</p>
                <img alt={item.title} src={item.img} />
              </div>
              <dl className="w-full h-full py-3">
                <dd className="text-2xl text-black">
                {item.title}
                </dd>
                <dd className="mt-4 text-base text-black">
                  {item.subs}
                </dd>
              </dl>
            </Link>
          </div>
        ))}
      </>
    );
  }