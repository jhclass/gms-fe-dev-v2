// import { styled } from "styled-components";

// const FootContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: center;
// `;
// const FInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   line-height: 1.6;
//   margin-left: 20px;
// `;

export default function Header() {
    return (
      <>
        <footer>
          <div className={'wrapper'}>
            <div>
              <h1>JHCLASS</h1>
              <div>
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
              </div>
              <div>
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
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }