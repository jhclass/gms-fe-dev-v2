// import { styled } from "styled-components";

import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer id="footer">
        <div className="py-3 bg-zinc-600">
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
        </div>
        <div className="py-10 bg-zinc-800">
          <div className="flex flex-col justify-center text-white wrap">
            <h1 className="w-[12rem]">
              <img src="https://highclass-image.s3.amazonaws.com/academy/hc_it/common/hc_logo_2_w.svg" />
            </h1>
            <ul className="mt-5 text-sm font-thin text-slate-400">
              <li>
                <span className="relative pr-2 mr-2 after:block after:w-[1px] after:h-3.5 after:bg-slate-400 after:absolute after:right-0 after:top-0.5">
                  H-CLASS
                </span>
                <span className="relative pr-2 mr-2 after:block after:w-[1px] after:h-3.5 after:bg-slate-400 after:absolute after:right-0 after:top-0.5">
                  대표 : 심혜원
                </span>
                <span>사업자등록번호 : 537-42-01115</span>
              </li>
              <li>
                <span className="relative pr-2 mr-2 after:block after:w-[1px] after:h-3.5 after:bg-slate-400 after:absolute after:right-0 after:top-0.5">
                  통신판매업신고 : 537-42-01115
                </span>
                <span className="relative pr-2 mr-2 after:block after:w-[1px] after:h-3.5 after:bg-slate-400 after:absolute after:right-0 after:top-0.5">
                  개인정보보호책임자 : 윤명노
                </span>
                <span>E-mail : admin@highclass.com</span>
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
              Copyright by HIGH-CLASS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
