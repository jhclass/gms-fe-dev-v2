import Head from "next/head";
import styled from "styled-components";


const Wrapper = styled.div`
  display: flex;

  padding: 10px 0;
  width: 1440px;
  margin: 0 auto;
  flex-direction: column;
`;

const Hfirst = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
`;
const HLnb = styled.ul`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  li {
    padding: 0 15px;
  }
`;
const HSecond = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  li {
    padding: 0 15px;
  }
`;
const FootContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const FInfo = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.6;
  margin-left: 20px;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css"
        ></link>
      </Head>
      <header>
        <Wrapper>
          <Hfirst>
            <div>[공지] 2024 얼리버드 30% 할인!</div>
            <HLnb>
              <li>로그인</li>
              <li>마이페이지</li>
            </HLnb>
          </Hfirst>
          <HSecond>
            <h1>admin</h1>
          </HSecond>
        </Wrapper>
      </header>{" "}
      {/**header */}
      <div>
        <Wrapper>
          <div>
            어드민민민민
          </div>
        </Wrapper>
      </div>{" "}
      {/**content */}
      <footer>
        <Wrapper>
          <FootContainer>
            <h1>JHCLASS</h1>
            <FInfo>
              <span>
                <b>운영/상담 시간</b> : 오전 10시 - 오후 7시
              </span>
              <span>
                <b>E-mail</b> : admin@jhclass.com
              </span>
              <span>
                <b>주소</b> : 서울 강남구 역삼동 1807 센트럴벤치빌딩 15층
              </span>
              <span>
                <b>Tel</b> : 1544-1234
              </span>
              <span>
                <b>E-mail</b> : admin@jhclass.com
              </span>
            </FInfo>
            <FInfo>
              <span>
                <b>회사명</b> : JHCLASS 아카데미
              </span>
              <span>
                <b>대표</b> : 이진형
              </span>
              <span>
                <b>사업자등록번호</b> : 109-09-75359
              </span>
              <span>
                <b>통신판매업신고</b> : 서울강남-01-123456
              </span>
            </FInfo>
          </FootContainer>
        </Wrapper>
      </footer>{" "}
      {/**footer */}
    </>
  );
}
