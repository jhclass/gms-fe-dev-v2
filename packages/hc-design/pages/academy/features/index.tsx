import Form from '@/components/Form'
import Link from 'next/link'
import styled from 'styled-components'

const Wrap = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Content3 = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
`

const ConBtn = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default function academyFeatures() {
  return (
    <>
      <section>
        <div className="max-w-[2000px] mx-auto my-0 bg-[#2a2a2c]">
          <div className="hidden w-full wmd:block">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/academy_features_01.webp"
              alt="교육은 듣는사람이 재미있어야합니다. 가르치는 사람의 열정이 있어야합니다. 그리고 무엇보다, 기억에 남아야합니다."
            />
            <Wrap>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/academy_features_02.webp"
                alt="attention 올바르지 않은 실무 교육의 판단은 이제 개선 되어야 합니다. 한번쯤 이런 고민을 해보셨다면 주목해보세요. 전공자, 비전공자의 고민을 공감하고 목표달성을 함께하겠습니다."
              />
              <div className="relative">
                <Content3>
                  <ConBtn>
                    <img
                      src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/academy_features_03_01.webp"
                      alt=" Q. 에이치아카데미의 교육은 무엇이 다른가요? 만족도가 다릅니다.그리고 수강생의 결과가 다릅니다. 비전공자라도 취업이 가능하도록 만드는 아카데미.본원에 방문하시면 그 결과를 보여드립니다."
                    />
                    <p>
                      <Link href={'#'}>
                        <img
                          src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/academy_features_03_btn02.webp"
                          alt="취업시스템 확인하기"
                        />
                      </Link>
                    </p>
                    <p>
                      <Link href={'#'}>
                        <img
                          src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/academy_features_03_btn04.webp"
                          alt="수강생후기 확인하기"
                        />
                      </Link>
                    </p>
                  </ConBtn>

                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/academy_features_03_02.webp"
                    alt=""
                  />
                  <ConBtn>
                    <img
                      src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/academy_features_03_03.webp"
                      alt=" Q. 배우면 뭐해?... 실무에서 아쓰는데?.. 현업에서 활동중인 디자이너가 직접 강의를 진행합니다. 배웠지만 사용할 수 없는 촌스러운 강의는 하지 않습니다. 수업에 참여만해도, 실력이 업그레이드 됩니다. 에이치아카데미 강의는 특별합니다."
                    />
                    <p>
                      <Link href={'#'}>
                        <img
                          src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/academy_features_03_btn01.webp"
                          alt="정규과정 확인하기"
                        />
                      </Link>
                    </p>
                    <p>
                      <Link href={'#'}>
                        <img
                          src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/academy_features_03_btn03.webp"
                          alt="국비지원 확인하기"
                        />
                      </Link>
                    </p>
                  </ConBtn>
                </Content3>
              </div>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/academy_features_04.webp"
                alt="“디자이너/프로그래머를 희망하는 당신에게 에이치아카데미 연구진만의 반복 T.A.P.E.(4단계) 시스템으로 상상 이상의 실력을 만들어드리겠습니다.”
              1 단계 = Theory 실무이론의 이해 감각과 툴에만 의존하지 않고 트렌드에 입각한 실무 디자이너/프로그래머의 생각과 이론을 배웁니다.
              2 단계 = Application 실무에서 사용하지 않는 불필요한 툴과 스킬은 배우지 않습니다. 디자인과 프로그래밍을 위한 사용법과 기술, 습관을 익힙니다.
              3 단계 = Plan 컨셉 및 기획 디자이너하고 해서 표현만 한다면, 프로그래머라고 해서 SI만 한다면, 오퍼레이터가 될 수 밖에 없습니다. 기획과 함께 컨셉 목표를 도출하는 방법을 배웁니다.
              4 댠계 = Employment 결과 & 취업 신입 디자이너/개발자 및 전공자 학생 이상의 실력을 갖춘, 트렌디한 인재로 거듭납니다.
              “에이치아카데미의 목표는 하나입니다. 학생을 디자이너/ 작가/ 프로그래머로 만들고 직업을 갖게하는것. 수강료가 아까지않은 가치를 원한다면, 최고의 아카데미를 선택하세요.”
              "
              />
            </Wrap>
          </div>
          <div className="block w-full wmd:hidden">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/academy_features_01.webp"
              alt="교육은 듣는사람이 재미있어야합니다. 가르치는 사람의 열정이 있어야합니다. 그리고 무엇보다, 기억에 남아야합니다.
                attention 올바르지 않은 실무 교육의 판단은 이제 개선 되어야 합니다. 한번쯤 이런 고민을 해보셨다면 주목해보세요.
                전공자, 비전공자의 고민을 공감하고 목표달성을 함께하겠습니다. Q. 에이치아카데미의 교육은 무엇이 다른가요? 만족도가 다릅니다.그리고 수강생의 결과가 다릅니다. 비전공자라도 취업이 가능하도록 만드는 아카데미.본원에 방문하시면 그 결과를 보여드립니다.
                배우면 뭐해?... 실무에서 아쓰는데?.. 현업에서 활동중인 디자이너가 직접 강의를 진행합니다. 배웠지만 사용할 수 없는 촌스러운 강의는 하지 않습니다. 수업에 참여만해도, 실력이 업그레이드 됩니다. 에이치아카데미 강의는 특별합니다."
            />
            <div>
              <p>
                <Link href={'#'}>
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/academy_features_03_btn01.webp"
                    alt="정규과정 확인하기"
                  />
                </Link>
              </p>
              <p>
                <Link href={'#'}>
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/academy_features_03_btn02.webp"
                    alt="취업시스템 확인하기"
                  />
                </Link>
              </p>
              <p>
                <Link href={'#'}>
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/academy_features_03_btn03.webp"
                    alt="국비지원 확인하기"
                  />
                </Link>
              </p>
              <p>
                <Link href={'#'}>
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/academy_features_03_btn04.webp"
                    alt="수강생후기 확인하기"
                  />
                </Link>
              </p>
            </div>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/academy_features_02.webp"
              alt="“디자이너/프로그래머를 희망하는 당신에게 에이치아카데미 연구진만의 반복 T.A.P.E.(4단계) 시스템으로 상상 이상의 실력을 만들어드리겠습니다.”
              1 단계 = Theory 실무이론의 이해 감각과 툴에만 의존하지 않고 트렌드에 입각한 실무 디자이너/프로그래머의 생각과 이론을 배웁니다.
              2 단계 = Application 실무에서 사용하지 않는 불필요한 툴과 스킬은 배우지 않습니다. 디자인과 프로그래밍을 위한 사용법과 기술, 습관을 익힙니다.
              3 단계 = Plan 컨셉 및 기획 디자이너하고 해서 표현만 한다면, 프로그래머라고 해서 SI만 한다면, 오퍼레이터가 될 수 밖에 없습니다. 기획과 함께 컨셉 목표를 도출하는 방법을 배웁니다.
              4 댠계 = Employment 결과 & 취업 신입 디자이너/개발자 및 전공자 학생 이상의 실력을 갖춘, 트렌디한 인재로 거듭납니다.
              “에이치아카데미의 목표는 하나입니다. 학생을 디자이너/ 작가/ 프로그래머로 만들고 직업을 갖게하는것. 수강료가 아까지않은 가치를 원한다면, 최고의 아카데미를 선택하세요.”
              "
            />
          </div>
        </div>
      </section>
    </>
  )
}
