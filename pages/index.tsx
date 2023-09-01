import Head from "next/head";
import Image from "next/image";
import styles from "@/pages/css/index.module.css";
import Link from "next/link";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
const HGnb = styled.ul`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  li {
    padding: 0 15px;
  }
`;

const MContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
  flex-direction: column;
`;
const MContentsTitle = styled.h2`
  font-size: 30px;
  font-weight: 600;
`;

const McontentsSubText = styled.p`
  margin: 20px 0 50px;
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
  div {
    background: transparent;
    img {
      width: 100%;
      object-fit: cover;
      vertical-align: bottom;
    }
    h3 {
      font-size: 20px;
      margin-top: 10px;
      font-weight: 600;
      padding: 0 5px 0;
    }
    p {
      margin-top: 10px;
      line-height: 1.6;
      padding: 0 5px 0;
    }
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
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
            <h1>JHCLASS</h1>
            <HGnb className={styles.gnb}>
              <li>💥베스트💥</li>
              <li>디자인</li>
              <li>영상</li>
              <li>자격증</li>
              <li>국비지원</li>
            </HGnb>
          </HSecond>
        </Wrapper>
      </header>{" "}
      {/**header */}
      <div>
        <Wrapper>
          <div>
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              className="mySwiper1"
            >
              <SwiperSlide>
                <img src="https://placehold.it/1440x600" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://placehold.it/1440x600" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://placehold.it/1440x600" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://placehold.it/1440x600" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://placehold.it/1440x600" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://placehold.it/1440x600" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://placehold.it/1440x600" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://placehold.it/1440x600" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://placehold.it/1440x600" />
              </SwiperSlide>
            </Swiper>
          </div>
          <MContents>
            <MContentsTitle>현재 모집중이예요</MContentsTitle>
            <McontentsSubText>지금 결제하면 20만원 추가 할인!</McontentsSubText>
            <GridContainer>
              <div>
                <img src="https://placehold.it/500x500" />
                <h3>JAVASCRIPT 마스터 과정 (6개월)</h3>
                <p>최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.</p>
              </div>
              <div>
                <img src="https://placehold.it/500x500" />
                <h3>JAVASCRIPT 마스터 과정 (6개월)</h3>
                <p>최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.</p>
              </div>
              <div>
                <img src="https://placehold.it/500x500" />
                <h3>JAVASCRIPT 마스터 과정 (6개월)</h3>
                <p>최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.</p>
              </div>
              <div>
                <img src="https://placehold.it/500x500" />
                <h3>JAVASCRIPT 마스터 과정 (6개월)</h3>
                <p>최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.</p>
              </div>
              <div>
                <img src="https://placehold.it/500x500" />
                <h3>JAVASCRIPT 마스터 과정 (6개월)</h3>
                <p>최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.</p>
              </div>
              <div>
                <img src="https://placehold.it/500x500" />
                <h3>JAVASCRIPT 마스터 과정 (6개월)</h3>
                <p>최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.</p>
              </div>
              <div>
                <img src="https://placehold.it/500x500" />
                <h3>JAVASCRIPT 마스터 과정 (6개월)</h3>
                <p>최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.</p>
              </div>
              <div>
                <img src="https://placehold.it/500x500" />
                <h3>JAVASCRIPT 마스터 과정 (6개월)</h3>
                <p>최신 자바스크립트 es6를 활용하여 풀스택개발에 도전하세요.</p>
              </div>
            </GridContainer>
          </MContents>
          <MContents>
            <h2>현재 모집중인 강의!</h2>
          </MContents>
          <MContents>
            <h2>현재 모집중인 강의!</h2>
          </MContents>
        </Wrapper>
      </div>{" "}
      {/**content */}
      <footer> 푸터 </footer> {/**footer */}
      <aside>Aside,상담신청</aside> {/**footer */}
    </>
  );
}
