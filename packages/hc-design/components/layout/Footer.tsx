import { styled } from 'styled-components'

const Wrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  display: flex;
`
const ShareBox = styled.ul`
  display: flex;
  margin-left: 155px;
  padding: 40px 0;
  gap: 9px;

  > li {
    cursor: pointer;
  }

  @media (max-width: 960px) {
    display: none;
  }
`

export default function Footer() {
  return (
    <>
      <footer id="footer">
        <div className="hidden md:block">
          <div className="wrap" style={{ display: 'flex' }}>
            <p>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/footer_info.webp"
                alt="H ACADEMY ㅣ 대표 : 윤명노 ㅣ 사업자등록번호 : 641-88-00207 | 개인정보보호책임자 : 윤명노 ㅣ E-mail : highclass.yoon@gmail.com |Tel: 02-393-4321 ㅣ Fax : 02-365-5880 ㅣ 주소 : 서울 서대문구 신촌로 141(대현동,은하빌딩) | ⓒ 2023. H ACADEMY Co. All rights reserved."
              />
            </p>
            {/* <ShareBox>
              <li>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/footer_btn01.webp"
                  alt="이메일"
                />
              </li>
              <li>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/footer_btn02.webp"
                  alt="네이버블로그"
                />
              </li>
              <li>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/footer_btn03.webp"
                  alt="인스타그램"
                />
              </li>
              <li>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/footer_btn04.webp"
                  alt="유튜브"
                />
              </li>
            </ShareBox> */}
          </div>
        </div>
        <img
          className="block md:hidden"
          src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/mo/footer_info.webp"
          alt="H ACADEMY ㅣ 대표 : 윤명노 ㅣ 사업자등록번호 : 641-88-00207 | 개인정보보호책임자 : 윤명노 ㅣ E-mail : highclass.yoon@gmail.com |Tel: 02-393-4321 ㅣ Fax : 02-365-5880 ㅣ 주소 : 서울 서대문구 신촌로 141(대현동,은하빌딩) | ⓒ 2023. H ACADEMY Co. All rights reserved."
        />
      </footer>
    </>
  )
}
