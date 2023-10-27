import MainTitle from "@/components/MainTitle";

export default function Comming() {
  const list = [
    {
      title: "직관을 데이터로, 비즈니스를 위한 데이터 기초 사고법",
      img: "/src/images/coming01.jpg",
      opneDate: "🔥10월 26일 OPEN🔥",
      name: "파이썬 | 죠르디",
    },
    {
      title: "직관을 데이터로, 비즈니스를 위한 데이터 기초 사고법",
      img: "/src/images/coming02.jpg",
      opneDate: "🔥10월 26일 OPEN🔥",
      name: "파이썬 | 죠르디",
    },
    {
      title: "직관을 데이터로, 비즈니스를 위한 데이터 기초 사고법",
      img: "/src/images/coming03.jpg",
      opneDate: "🔥10월 26일 OPEN🔥",
      name: "파이썬 | 죠르디",
    },
    {
      title: "직관을 데이터로, 비즈니스를 위한 데이터 기초 사고법",
      img: "/src/images/coming04.jpg",
      opneDate: "🔥10월 26일 OPEN🔥",
      name: "파이썬 | 죠르디",
    },
    {
      title: "직관을 데이터로, 비즈니스를 위한 데이터 기초 사고법",
      img: "/src/images/coming05.jpg",
      opneDate: "🔥10월 26일 OPEN🔥",
      name: "파이썬 | 죠르디",
    },
    {
      title: "직관을 데이터로, 비즈니스를 위한 데이터 기초 사고법",
      img: "/src/images/coming06.jpg",
      opneDate: "🔥10월 26일 OPEN🔥",
      name: "파이썬 | 죠르디",
    },
    {
      title: "직관을 데이터로, 비즈니스를 위한 데이터 기초 사고법",
      img: "/src/images/coming07.jpg",
      opneDate: "🔥10월 26일 OPEN🔥",
      name: "파이썬 | 죠르디",
    },
    {
      title: "직관을 데이터로, 비즈니스를 위한 데이터 기초 사고법",
      img: "/src/images/coming08.jpg",
      opneDate: "🔥10월 26일 OPEN🔥",
      name: "파이썬 | 죠르디",
    },
  ]
  return (
    <>
      <div className="wrap">
        <MainTitle title={'Coming Soon 🔔'} subs={'H-CLASS의 오픈 예정 강좌'} colorWhite={true}/>
        <div className="grid grid-cols-1 gap-4 mt-5 mb-[2rem] md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {list.map((item, index) => (
              <div key={index}>
                <div className="overflow-hidden rounded-t-lg border-1 rounded-e-lg border-zinc-600">
                  <figure>
                    <img src={item.img} alt={item.title} width="100%" />
                  </figure>
                  <dl className="relative z-10 px-3 pt-5 pb-3 rounded-t-3xl mt-[-2rem] bg-zinc-800 shadow-[0_-0.2rem_2rem_0.8rem_rgba(0,0,0,0.6)]">
                    <dd className="text-sm font-bold text-white">{item.opneDate}</dd>
                    <dt className="mt-1 text-lg font-bold text-zinc-200 line-clamp-2">{item.title}</dt>
                    <dd className="mt-1 text-sm text-zinc-400">{item.name}</dd>
                  </dl>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}