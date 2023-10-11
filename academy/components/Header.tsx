import Link from "next/link";

export default function Header() {
    return (
      <>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
        <header>
          <div>
            <div className={'wrapper'}>
              <h1>로고</h1>
              <ul>
                <li>
                  <Link href="">
                    로그인
                  </Link>
                  <Link href="">
                    회원가입
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <ul>
              <li>
                <Link href="">
                  웹&amp;앱 프로그래밍
                </Link>
              </li>
              <li>
                <Link href="">
                인공지능&amp;클라우드
                </Link>
              </li>
              <li>
                <Link href="">
                  K-디지털(IOT,ICT융합)
                </Link>
              </li>
              <li>
                <Link href="">
                  내일 FLEX 0원
                </Link>
              </li>
            </ul>
          </div>
        </header>
      </>
    );
  }