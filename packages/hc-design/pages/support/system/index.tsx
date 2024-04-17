import Link from 'next/link'
import styled from 'styled-components'

const Btnbox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 50%;
  padding-left: 1rem;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-left: 4rem;
  }
`

export default function supportSystem() {
  return (
    <>
      <section>
        <div>
          <div className="max-w-[2000px] mx-auto my-0">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/support_system_01.webp"
              alt="Mentoring
              Job Strategy
              Matching
              1:1 Consulting"
              className="hidden w-full wmd:block"
            ></img>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/support_system_01.webp"
              alt="Mentoring
              Job Strategy
              Matching
              1:1 Consulting
              jOb conSulting sySteM. 
              에이치아카데미 @취업지원시스템 소개
              에이치아카데미 취업지원센터는 수강생 여러분의 취업 및 작가데뷔 꿈을 이뤄드리기 위한 전문적인 컨설팅 시스템을 제공합니다. 
              최고의 디자인, 웹툰, IT 회사 및 유명 기업에 취업을 성공 할 수 있도록 함께 고민을 해결하고 기쁨을 나누며, 1:1 담당자 매칭을 통한 성공 취업시스템을 제공하겠습니다.
              에이치아카데미의 수강생은 언제나 간편하게 취업상담을 제공 받으실 수 있습니다. 담당자를 통하여 취업지원센터에 이력서를 등록하고 수정하며, 분야와 조건에 맞는 기업을 실시간으로 매칭해드리고 있습니다.
              Mentoring Job Strategy 
              또한, 모든 수강생은 취업지원센터에서 엄선한 기업 채용정보를 편리하게 열람하실 수 있으며, 전문 컨설턴트가 1:1 개별 컨설팅을 통해 취업전략을 지원합니다. 필요에 따라 정기적인 면접 코칭 및 이미지메이킹을 무료로 제공하며, 기업에 맞춘 인적성 능력을 향상시켜드리고 있습니다.
              Matching 1:1 Consulting
              취업상담 & 인재정보등록 > 1:1 취업컨설팅 & 인재정보 기업매칭 > 채용정보 열람 & 취업교육진행 > 취업성공!!"
              className="block w-full wmd:hidden"
            ></img>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto my-0">
          <div className="hidden w-full wmd:block">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/support_system_02.webp"
              alt="jOb conSulting sySteM. 
              에이치아카데미 @취업지원시스템 소개
              에이치아카데미 취업지원센터는 수강생 여러분의 취업 및 작가데뷔 꿈을 이뤄드리기 위한 전문적인 컨설팅 시스템을 제공합니다. 
              최고의 디자인, 웹툰, IT 회사 및 유명 기업에 취업을 성공 할 수 있도록 함께 고민을 해결하고 기쁨을 나누며, 1:1 담당자 매칭을 통한 성공 취업시스템을 제공하겠습니다.
              에이치아카데미의 수강생은 언제나 간편하게 취업상담을 제공 받으실 수 있습니다. 담당자를 통하여 취업지원센터에 이력서를 등록하고 수정하며, 분야와 조건에 맞는 기업을 실시간으로 매칭해드리고 있습니다.
              Mentoring Job Strategy 
              또한, 모든 수강생은 취업지원센터에서 엄선한 기업 채용정보를 편리하게 열람하실 수 있으며, 전문 컨설턴트가 1:1 개별 컨설팅을 통해 취업전략을 지원합니다. 필요에 따라 정기적인 면접 코칭 및 이미지메이킹을 무료로 제공하며, 기업에 맞춘 인적성 능력을 향상시켜드리고 있습니다.
              Matching 1:1 Consulting
              취업상담 & 인재정보등록 > 1:1 취업컨설팅 & 인재정보 기업매칭 > 채용정보 열람 & 취업교육진행 > 취업성공!!
              "
            ></img>
            <Btnbox>
              <Link href="/cs/curriculum">
                {/* <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/support_system_btn01.webp"
                  alt="취업현황 확인하기"
                  style={{ width: '19.8611VW', maxWidth: '286px' }}
                ></img> */}
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/support_system_btn03.webp"
                  alt="전체과정 확인하기"
                  style={{ width: '19.8611VW', maxWidth: '286px' }}
                ></img>
              </Link>
              <Link href="/cs/consult">
                {/* <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/support_system_btn02.webp"
                  alt="채용정보 확인하기"
                  style={{ width: '19.8611VW', maxWidth: '286px' }}
                ></img> */}
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/support_system_btn04.webp"
                  alt="시간표조회 확인하기"
                  style={{ width: '19.8611VW', maxWidth: '286px' }}
                ></img>
              </Link>
            </Btnbox>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/support_system_03.webp"
              alt="에이치아카데미의 트렌디한 컨설팅 노하우로 취업의 기쁨을 함께하세요."
            ></img>
          </div>
          <div className="block w-full wmd:hidden">
            <Btnbox>
              <Link href="/cs/curriculum">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/support_system_btn03.webp"
                  alt="전체과정 확인하기"
                  style={{ width: '46.8519VW' }}
                ></img>

                {/* <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/support_system_btn01.webp"
                  alt="취업현황 확인하기"
                  style={{ width: '46.8519VW' }}
                ></img> */}
              </Link>
              <Link href="/cs/consult">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/support_system_btn04.webp"
                  alt="시간표조회 확인하기"
                  style={{ width: '46.8519VW' }}
                ></img>
                {/* <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/support_system_btn02.webp"
                  alt="채용정보 확인하기"
                  style={{ width: '46.8519VW' }}
                ></img> */}
              </Link>
            </Btnbox>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/support_system_02.webp"
              alt="에이치아카데미의 트렌디한 컨설팅 노하우로 취업의 기쁨을 함께하세요."
            ></img>
          </div>
        </div>
      </section>
    </>
  )
}
