import React from 'react'

export default function Curriculum02() {
  const list = [
    {
      title: '원화의 드로잉 방법',
      img: '/src/images/curri02.jpg',
      content: [
        {
          tit: '학생의 원하는 스타일에 대한 상담',
          subText: '',
        },
        {
          tit: '스타일에 장점과 단점의 파악',
          subText: '',
        },
        {
          tit: '추구하는 방향성 피드백',
          subText: '',
        },
      ],
    },
    {
      title: '원화의 드로잉 방법',
      img: '/src/images/curri01.jpg',
      content: [
        {
          tit: '학습상담',
          subText: '본인 스타일에 맞는 그림체로 스케치',
        },
        {
          tit: '드로잉',
          subText: '캐릭터 성을 부각할 실루엣을 제작\n캐릭터 의상디자인 제작',
        },
      ],
    },
  ]
  return (
    <>
      <div className="wrap">
        <h4 className="text-3xl font-bold">CURRICULUM</h4>
        <p className="mt-3 text-base">
          기초부터 재직자까지 누구나!
          <br />
          화려한 경력의 강사진들의 노하우와 자부심이 담긴 개인별 맞춤 교육과정을
          제공합니다.
        </p>
        {list.map((item, index) => (
          <div key={index} className="mt-5">
            <h6 className="py-2 text-2xl font-bold border-b-1 border-zinc-700">
              <span className="pr-2 text-zinc-600">Step {index + 1}.</span>
              {item.title}
            </h6>
            <div className="flex flex-col justify-between lg:flex-row">
              <ul className="w-full pt-3 lg:w-1/2">
                {item.content.map((text, secIndex) => (
                  <li
                    key={secIndex}
                    className="relative py-2 pr-3 text-base pl-[1.5rem] text-zinc-600 after:w-[0.3rem] after:h-[0.3rem] after:rounded-full after:bg-zinc-600 after:absolute after:top-[1.1rem] after:left-[0.5rem] "
                  >
                    <span className="block text-xl font-bold">{text.tit}</span>
                    {text.subText && (
                      <p>
                        {text.subText.split('\n').map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            {index < text.subText.split('\n').length - 1 && (
                              <br />
                            )}
                          </React.Fragment>
                        ))}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <figure className="w-full lg:w-1/2 lg:pl-5 pt-7">
                <img src={item.img} alt={item.title} />
              </figure>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
