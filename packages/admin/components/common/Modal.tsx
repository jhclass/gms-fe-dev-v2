import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import { Button } from '@nextui-org/react'

const BreadcrumbBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export default function Breadcrumb({ isActive, onFilterToggle, onBtn }) {
  const router = useRouter()
  const [breadcrumb, setBreadcrumb] = useState<string[]>([])

  useEffect(() => {
    const pathnames = router.asPath.split('/').filter(x => x)
    setBreadcrumb(pathnames)
  }, [router.asPath])

  return <></>
}
