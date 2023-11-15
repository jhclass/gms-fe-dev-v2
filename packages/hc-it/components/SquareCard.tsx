import { Link } from '@nextui-org/react'

export default function RankingCard() {
  const list = [
    {
      title: '웹툰작가에게 배우는 웹툰제작과정 Webtoon',
      img: '/src/detail/d2_thumb.webp',
      subs: '처음 입문자도 스킬업이 필요한 사람도, 취미로 배우고 싶은 사람도, 작가데뷔나 취업을 희망하는 사람도 웹툰을 좋아하면 모두 환영!',
      link: '/detail/2',
    },
    {
      title: 'React.js 프론트엔드 개발',
      img: '/src/images/new02.jpg',
      subs: '자바스크립트를 이용해서 애플리케이션을 만들 수 있는 입문자를 위한 리액트!',
      link: '/detail/1',
    },
    {
      title: '1분만에 듣는 백엔드 개발 실무 노하우',
      img: '/src/images/new03.jpg',
      subs: '어디서도 알려주지 않아던 해답 더 나은 백엔드 개발자로 성장하기 위한 실마리를 전해드립니다.',
      link: '/detail/1',
    },
    {
      title: 'MBTI 테스트로 배우는 웹 개발 왕 초보 입문',
      img: '/src/images/new04.jpg',
      subs: '[내일배움카드] 국비지원으로 배우는 1:8 웹 개발 왕초보 입문',
      link: '/detail/1',
    },
    {
      title: '하나 하나 따라하며 배우는 리액트 A-Z',
      img: '/src/images/new05.jpg',
      subs: '개념도 익히고 실습도 하며 리액트를 배우는 프론트엔드 초급자를 위한 강의',
      link: '/detail/1',
    },
    {
      title: '프로가 알려주는 생생한 노하우 프로그램의 시작',
      img: '/src/images/new06.jpg',
      subs: '프로그래밍, 크리에이티브, 커리어까지 사전 지식 없이 누구나 배울 수 있는 강의모음',
      link: '/detail/1',
    },
    {
      title: 'SIGNATURE 프론트엔드 웹 개발의 모든 것',
      img: '/src/images/new07.jpg',
      subs: '프론트엔드 웹 개발의 모든 것 사전 지식이 없어도 강의 하나로 입문부터 실전까지 ',
      link: '/detail/1',
    },
    {
      title: '마이크로 프론트엔드 대규모서비스를 위한 서비스 아키텍처',
      img: '/src/images/new08.jpg',
      subs: 'Micro Frontend부터 모노레포까지 대규모 서비스를 위한 프론트엔드 아키텍처',
      link: '/detail/1',
    },
    {
      title: '만들면서 익히는 React의 모든 것 With. 25개 스택',
      img: '/src/images/new09.jpg',
      subs: 'React의 사용성을 높이는 스택을 함께 학습합니다. 따로 배울 필요 없이 한 강의로 끝낼 수 있습니다.',
      link: '/detail/1',
    },
    {
      title:
        '사이드 프로젝트: 10개 기술스택으로 구현하는 풀스택 서버리스 프로젝트',
      img: '/src/images/new10.jpg',
      subs: '프로젝트 계획부터 배포 후 유지 보수까지 실제 개발 사이클을 모두 커버하는 커리큘럼',
      link: '/detail/1',
    },
  ]
  return (
    <>
      {list.map((item, index) => (
        <div key={index}>
          <Link href={item.link} className="block">
            <div className="relative overflow-hidden rounded-r-xl rounded-tl-xl">
              <img alt={item.title} src={item.img} />
            </div>
            <div className="absolute top-0 left-0 flex flex-wrap gap-1">
              <span className="px-2 py-1 text-center text-white rounded-r-lg rounded-tl-lg font-center text-xs/xs bg-flag1">
                국비지원
              </span>
              <span className="px-2 py-1 text-center text-white rounded-r-lg rounded-tl-lg font-base text-xs/xs bg-flag2">
                커리어패스
              </span>
            </div>
            <dl className="w-full h-full py-3">
              <dd className="text-xl/snug font-bold text-black min-h-[3rem] line-clamp-2">
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
