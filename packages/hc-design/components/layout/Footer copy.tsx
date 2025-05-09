// import { styled } from "styled-components";

import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer id="footer">
        {/* <div className="py-3 bg-zinc-600">
          <ul className="flex items-center text-sm wrap">
            <li className="relative pr-2 mr-2 after:block after:w-[1px] after:h-4 after:bg-slate-400 after:absolute after:right-0 after:top-0.5">
              <Link href={{}} className="text-white">
                <span>회사소개</span>
              </Link>
            </li>
            <li className="relative pr-2 mr-2 after:block after:w-[1px] after:h-4 after:bg-slate-400 after:absolute after:right-0 after:top-0.5">
              <Link href={{}} className="text-white">
                <span>이용약관</span>
              </Link>
            </li>
            <li>
              <Link href={{}} className="text-white">
                <b>개인정보처리방침</b>
              </Link>
            </li>
          </ul>
        </div> */}
        <div className="py-10 bg-zinc-800">
          <div className="flex flex-col justify-center text-white wrap">
            <h1 className="w-[12rem]">
              <Link href="/">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/common/H_logo_w.svg"
                  alt="H ACADEMY | H아카데미"
                />
              </Link>
            </h1>
            <ul className="mt-5 text-sm font-thin text-slate-400">
              <li>
                <span className="relative pr-2 mr-2 after:block after:w-[1px] after:h-3.5 after:bg-slate-400 after:absolute after:right-0 after:top-0.5">
                  H ACADEMY
                </span>
                <span className="relative pr-2 mr-2 after:block after:w-[1px] after:h-3.5 after:bg-slate-400 after:absolute after:right-0 after:top-0.5">
                  대표 : 윤명노
                </span>
                <span>사업자등록번호 : 641-88-00207</span>
              </li>
              <li>
                <span className="relative pr-2 mr-2 after:block after:w-[1px] after:h-3.5 after:bg-slate-400 after:absolute after:right-0 after:top-0.5">
                  개인정보보호책임자 : 윤명노
                </span>
                <span>E-mail : highclass.yoon@gmail.com</span>
              </li>
              <li>
                <span className="relative pr-2 mr-2 after:block after:w-[1px] after:h-3.5 after:bg-slate-400 after:absolute after:right-0 after:top-0.5">
                  Tel: 02-393-4321
                </span>
                <span className="relative pr-2 mr-2 after:block after:w-[1px] after:h-3.5 after:bg-slate-400 after:absolute after:right-0 after:top-0.5">
                  Fax : 02-365-5880
                </span>
                <span>주소 : 서울 서대문구 신촌로 141(대현동,은하빌딩)</span>
              </li>
            </ul>
            <p className="mt-2 text-sm font-thin text-slate-200">
              <i className="xi-copyright" /> 2023. SOLUHERO Co. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
