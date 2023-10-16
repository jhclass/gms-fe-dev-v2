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