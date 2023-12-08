export default function Review() {
  const list = [
    {
      name: '김○○',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_it/eximg/user.webp',
      class: '프론트엔드 마스터반',
      rating: 3.7,
    },
    {
      name: '이○○',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_it/eximg/user.webp',
      class: '프론트엔드 마스터반',
      rating: 4.0,
    },
  ]
  return (
    <>
      <div className="wrap">
        <h4 className="text-center text-white">
          <span className="text-2xl">수강생들의 생생한 후기</span>
          <br />
          <b className="mt-4 text-3xl">REVIEW</b>
        </h4>
        <div className="mt-4">
          {list.map((item, index) => (
            <div
              key={index}
              className="flex flex-col py-6 lg:flex-row even:lg:flex-row-reverse"
            >
              <div className="flex mx-auto mb-5 w-[15rem] h-[15rem] lg:mx-8 lg:w-[23rem] lg:h-[23rem]">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  width="100%"
                />
              </div>
              <div className="relative flex-1 p-6 bg-white rounded-lg lg:p-10 lg:ml-12 even:lg:mr-12">
                <h5 className="text-2xl font-bold text-right">
                  <span className="block text-base text-primary">
                    <b className="text-zinc-600">{item.class}</b> 수강생
                  </span>
                  {item.name}
                </h5>
                <div className="flex flex-col mt-3 text-3xl font-bold items-left even:items-end">
                  <p>
                    <span className="text-primary">
                      {item.rating.toFixed(1).toString()}
                    </span>{' '}
                    / 5
                  </p>
                  <span
                    style={{ width: `${1.45 * item.rating}rem` }}
                    className="h-[1.2rem] display star_bg"
                  ></span>
                </div>
                <p className="relative text-base py-6 px-6 mt-16 bg-[#f2f3f5] border-t-2 border-t-white border-l-2 border-l-[#f2f3f5] after:w-12 after:h-12 after:border-l-[3rem] after:border-l-[#f2f3f5] after:border-[3rem] after:border-[transparent] after:absolute after:top-[-3rem] after:left-[-0.1rem]">
                  구현까지만 할 줄 아는 개발자는 많습니다. 하지만{' '}
                  <b>유저에 대해 치열하게 고민하며 성능을 챙기는 개발자</b>는
                  드물죠. 이번 프로젝트 구성은 제가 경험해 온
                  <b>
                    프로덕트 도메인의 인사이트(금융 - 카드사 &amp; 개인예산관리
                    프로젝트, 여행 - 여행 프로젝트)를
                  </b>{' '}
                  모두 모았습니다. 이 모든 강의는 프로덕트 도메인의 특성에 따라{' '}
                  <b>
                    유저가 어떠한 것을 기대하고 불편해하는지 파악하며 최적화
                  </b>
                  가 진행됩니다. 이를 통해 여러분은 유저에 대해 치열한 고민을
                  하고, 최적화까지 할 줄아는 개발자가 될 수 있습니다. 뿐만
                  아니라 부분 부분 최적화를 다루는 강의는 있지만, 실제 실무
                  베이스로 서비스에 최적화를 적용해나가는 최적화 강의는 많지
                  않습니다. 이 강의는{' '}
                  <b>실제 실무 베이스로 최적화를 다루며 적용</b>해나갑니다. 이
                  강의를 활용하신다면 개발하고 계시는 프로젝트에 강의 내용을
                  적용하고{' '}
                  <b>
                    프론트엔드 개발자로서 UX를 고려한 최적화까지 이뤄낼 수
                    있다고 자신있게 말씀드립니다.
                  </b>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
