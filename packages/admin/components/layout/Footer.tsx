import { navOpenState } from '@/lib/recoilAtoms'
import { animate, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { MME_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'

const FooterCon = styled.footer`
  display: flex;
  width: 100%;
  padding: 3rem 2rem;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #d4d4d8;

  @media screen and (max-width: 1024px) {
    padding: 2rem 1rem;
  }
`
const Copyright = styled.div`
  font-size: 0.75rem;
  color: #71717a;

  @media screen and (max-width: 1024px) {
    font-size: 0.75rem;
  }
`

export default function FooterComponent() {
  return (
    <>
      <FooterCon>
        <Copyright>
          <i className="xi-copyright" /> 2023. H ACADEMY Co. All rights
          reserved.
        </Copyright>
      </FooterCon>
    </>
  )
}
