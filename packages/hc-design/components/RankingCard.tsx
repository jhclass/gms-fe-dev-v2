import { Link } from '@nextui-org/react'

export default function RankingCard() {
  const list = [
    {
      title: '웹툰작가에게 배우는 웹툰제작과정 Webtoon',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/detail/webtoon_thumb_big.webp',
      subs: '드로잉의 이해부터 단편웹툰 제작까지! H ACADEMY 최고의 강사진이 웹툰의 모든것을 알려드립니다.',
      link: '/detail/webtoon',
    },
    {
      title: '생동감 있는 감정표현으로 5주 만의 이모티콘 크리에이터 되기',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/detail/emoticon_thumb_big.png',
      subs: 'H ACADEMY 스페셜 강사진의 1:1 개인 피드백을 통해 이모티콘 크리에이터로 데뷔',
      link: '/detail/emoticon',
    },
    {
      title: '영상편집 & 제작 취업과정 Motion Graphics',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/detail/motion_thumb_big.png',
      subs: '에프터이펙트, 에프터아이, 스네마4D, 블렌더 등을 활용한 영상 전문가를 양성합니다.',
      link: '/detail/motion',
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
