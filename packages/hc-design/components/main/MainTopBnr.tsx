import { Link } from '@nextui-org/link'
import styled from 'styled-components'

const TopBnrBox = styled.div`
  border-bottom: 2px solid #b8b8b8;
  @media (max-width: 960px) {
    display: none;
  }
`

const Wrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BnrArea = styled.div``
const BtnList = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const BtnItme = styled.li`
  position: relative;

  a {
    display: block;
    height: 100%;
    width: 100%;
    padding: 0 2rem;
  }

  span {
    display: block;
    height: 100%;
    width: 100%;
    padding: 0 2rem;
  }

  &:after {
    content: '';
    width: 2px;
    height: 20px;
    background: #060024;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -10px;
  }
  &:last-child {
    a {
      padding: 0 0 0 2rem;
    }
  }
`

export default function TopBnr() {
  return (
    <>
      <TopBnrBox>
        <Wrap>
          <BnrArea>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/main_top_img.webp"
              alt="2022 고객만족브랜드 대상 컴퓨터디자인 교육 부문"
            />
          </BnrArea>
          <BtnList>
            <BtnItme>
              <Link href="/cs/consult">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/main_top_btn1.webp"
                  alt="수강료조회"
                />
              </Link>
            </BtnItme>
            <BtnItme>
              <Link href="/cs/location">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/main_top_btn2.webp"
                  alt="위치조회"
                />
              </Link>
            </BtnItme>
            <BtnItme>
              <span>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/main_top_btn3.webp"
                  alt="02)364-0008"
                />
              </span>
            </BtnItme>
          </BtnList>
        </Wrap>
      </TopBnrBox>
    </>
  )
}
