import { Link } from '@nextui-org/react'

export default function RankingCard() {
  const list = [
    {
      title: '웹툰작가에게 배우는 웹툰제작과정 Webtoon',
      img: '/src/detail/d2_thumb02_big.webp',
      subs: '처음 입문자도 스킬업이 필요한 사람도, 취미로 배우고 싶은 사람도, 작가데뷔나 취업을 희망하는 사람도 웹툰을 좋아하면 모두 환영!',
      link: '/detail/2',
    },
    {
      title: '웹툰작가에게 배우는 웹툰제작과정 Webtoon',
      img: '/src/detail/d2_thumb03_big.webp',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/3',
    },
    {
      title: '면접 전에 알고 가면 좋을 것들 - 신입 JAVA 백엔드',
      img: '/src/images/hot02.webp',
      subs: '신입 Spring Java 백엔드 개발자로 취업을 원하는 사람, 특히 면접을 앞둔 사람을 위한 강의',
      link: '/detail/1',
    },
    {
      title: 'MBTI 테스트로 배우는 웹 개발 왕 초보 입문',
      img: '/src/images/new04.webp',
      subs: '[내일배움카드] 국비지원으로 배우는 1:8 웹 개발 왕초보 입문',
      link: '/detail/1',
    },
    {
      title: '프론트엔드 개발자를 위한 고성능 대규모 프로젝트',
      img: '/src/images/hot01.webp',
      subs: '고퀄리티 10개 프로젝트로 최적화 부터 유지보수까지 한번에',
      link: '/detail/1',
    },
    {
      title: '1분만에 듣는 백엔드 개발 실무 노하우',
      img: '/src/images/new03.webp',
      subs: '어디서도 알려주지 않아던 해답 더 나은 백엔드 개발자로 성장하기 위한 실마리를 전해드립니다.',
      link: '/detail/1',
    },
    {
      title: 'React.js 프론트엔드 개발',
      img: '/src/images/new02.webp',
      subs: '자바스크립트를 이용해서 애플리케이션을 만들 수 있는 입문자를 위한 리액트!',
      link: '/detail/1',
    },
    {
      title: '새로운 신드롬, ChatGPT 강의 시리즈',
      img: '/src/images/hot04.webp',
      subs: '지금 내게 필요한 ChatGPT 강의를 살펴 보세요.',
      link: '/detail/1',
    },
    {
      title: '백엔드 개발자를 위한 Kubernetes',
      img: '/src/images/hot05.webp',
      subs: '클라우드 네이티브 프로그래밍 백엔드 개발 관점에서 쿠버네티스 200% 활용법',
      link: '/detail/1',
    },
    {
      title: 'SIGNATURE 프론트엔드 웹 개발의 모든 것',
      img: '/src/images/new07.webp',
      subs: '프론트엔드 웹 개발의 모든 것 사전 지식이 없어도 강의 하나로 입문부터 실전까지 ',
      link: '/detail/1',
    },
  ]
  return (
    <>
      {list.map((item, index) => (
        <div key={index}>
          <Link href={item.link} className="block">
            <div className="relative overflow-hidden rounded-r-xl rounded-tl-xl">
              <p className="absolute bottom-0 left-0 w-10 h-10 text-center text-white rounded-r-lg rounded-tl-lg text-2xl/10 bg-primary">
                {index + 1}
              </p>
              <img alt={item.title} src={item.img} />
            </div>
            <div className="absolute top-0 left-0 flex flex-wrap gap-1">
              <span className="px-2 py-1 text-center text-white rounded-r-lg rounded-tl-lg font-base text-xs/xs bg-flag1">
                국비지원
              </span>
              <span className="px-2 py-1 text-center text-white rounded-r-lg rounded-tl-lg font-base text-xs/xs bg-flag2">
                커리어패스
              </span>
            </div>
            <dl className="w-full h-full py-3">
              <dd className="text-xl text-black font-bold min-h-[3rem] line-clamp-2">
                {item.title}
              </dd>
              <dd className="mt-2 text-base line-clamp-2 text-zinc-600">
                {item.subs}
              </dd>
            </dl>
          </Link>
        </div>
      ))}
    </>
  )
}
