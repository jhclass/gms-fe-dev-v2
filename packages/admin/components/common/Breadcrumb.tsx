import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import { Button, Link } from '@nextui-org/react'

type propsTypes = {
  rightArea: boolean
  isActive?: string
  onFilterToggle?: React.Dispatch<React.SetStateAction<number>>
  addRender?: React.ReactNode
}

const BreadcrumbBox = styled.div<{ $isIndex: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${props =>
    props.$isIndex
      ? ''
      : `@media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;
      }`}
`
const CateTitle = styled.h1`
  display: flex;
  align-items: center;
  width: 100%;
`
const BackIcon = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  color: #fff;
  margin-right: 0.5rem;
  background: #007de8;

  &:hover {
    background: #71717a;
  }
`
const Title1 = styled.span`
  font-size: 1.875rem;
  letter-spacing: -0.025em;
  font-weight: 700;
  line-height: 1;
  color: #11181c;
  padding: 0 0.25rem;
`
const Title2 = styled.span`
  font-weight: normal;
  font-size: 1.5rem;
  padding-left: 0.25rem;
`
const BoxRt = styled.div`
  display: flex;
`
const FilterBtn = styled(motion.button)`
  display: flex;
  height: 2rem;
  border: 1px solid #007de9;
  border-radius: 0.5rem;
  align-items: center;
  margin-right: 0.5rem;
`

const ActiveIcon = styled(motion.i)`
  padding: 0.5rem;
  color: #fff;
`

const FilterVariants = {
  initial: {
    padding: '0 1rem',
    background: '#fff',
    color: '#007de9',
    transition: {},
  },
  active: {
    padding: '0 1rem 0 0.5rem',
    background: '#007de9',
    color: '#fff',
    transition: {},
  },
}

const IconVariants = {
  initial: {
    scale: 0,
    display: 'none',
  },
  active: {
    scale: 1,
    display: 'inline',
  },
}

const categories = [
  {
    href: '/',
    iconSrc: 'ico_home',
    alt: '대시보드',
    label: '대시보드',
    isBreadcrumb: false,
    isFilter: false,
    isWrite: '',
  },
  {
    href: '/consult',
    iconSrc: 'ico_consult',
    alt: '상담관리',
    label: '상담관리',
    isBreadcrumb: true,
    isFilter: true,
    isWrite: '/consult/write',
  },
  {
    href: '/consult/detail',
    iconSrc: 'ico_consult',
    alt: '상담상세',
    label: '상담상세',
    isBreadcrumb: true,
    isFilter: false,
    isWrite: '',
  },
  {
    href: '/consult/write',
    iconSrc: 'ico_consult',
    alt: '상담등록',
    label: '상담등록',
    isBreadcrumb: true,
    isFilter: false,
    isWrite: '',
  },
  {
    href: '/subjects',
    iconSrc: 'ico_work',
    alt: '과정관리',
    label: '과정관리',
    isBreadcrumb: true,
    isFilter: true,
    isWrite: '/subjects/write',
  },
  {
    href: '/subjects/detail',
    iconSrc: 'ico_work',
    alt: '과정상세',
    label: '과정상세',
    isBreadcrumb: true,
    isFilter: false,
    isWrite: '',
  },
  {
    href: '/subjects/write',
    iconSrc: 'ico_work',
    alt: '과정등록',
    label: '과정등록',
    isBreadcrumb: true,
    isFilter: false,
    isWrite: '',
  },
  {
    href: '/registration',
    iconSrc: 'ico_regist',
    alt: '수강생등록',
    label: '수강생등록',
    isBreadcrumb: true,
    isFilter: false,
    isWrite: '',
  },
  {
    href: '/accounting',
    iconSrc: 'ico_accounting',
    alt: '회계관리',
    label: '회계관리',
    isBreadcrumb: true,
    isFilter: false,
    isWrite: '',
  },
]

export default function Breadcrumb(props) {
  const router = useRouter()
  const [breadcrumb, setBreadcrumb] = useState<string[]>([])

  useEffect(() => {
    const pathnames = router.pathname.split('/').filter(x => x)
    setBreadcrumb(pathnames)
  }, [router.pathname])

  const currentItem =
    breadcrumb.length > 1
      ? categories.find(
          item => item.href === `/${breadcrumb[0]}/${breadcrumb[1]}`,
        )
      : categories.find(item => item.href === `/${breadcrumb[0]}`)

  const parentItem = categories.find(item => item.href === `/${breadcrumb[0]}`)
  return (
    <>
      {currentItem?.isBreadcrumb && (
        <BreadcrumbBox $isIndex={breadcrumb.length == 1 ? true : false}>
          <CateTitle>
            {breadcrumb.length == 1 ? (
              <Title1>{parentItem?.label}</Title1>
            ) : (
              <>
                <Link href={parentItem?.href}>
                  <BackIcon>
                    <i className="xi-arrow-left"></i>
                  </BackIcon>
                </Link>
                <Title1>{parentItem?.label}</Title1>
                <Title2>
                  <i className="xi-angle-right-thin" />
                </Title2>
                <Title2>{currentItem?.label}</Title2>
              </>
            )}
          </CateTitle>
          {props.rightArea && (
            <BoxRt>
              {currentItem.isFilter && (
                <FilterBtn
                  variants={FilterVariants}
                  initial="initial"
                  animate={props.isActive ? 'active' : 'initial'}
                  onClick={() => {
                    props.onFilterToggle(prev => !prev)
                  }}
                >
                  <ActiveIcon
                    variants={IconVariants}
                    initial="initial"
                    animate={props.isActive ? 'active' : 'initial'}
                    className="xi-check-min"
                  />
                  Filter
                </FilterBtn>
              )}
              {currentItem.isWrite !== '' && (
                <Button
                  size="sm"
                  radius="sm"
                  variant="solid"
                  className="text-white bg-flag1"
                  onClick={() => router.push(currentItem.isWrite)}
                >
                  등록
                </Button>
              )}
              {props.addRender !== '' && <>{props.addRender}</>}
            </BoxRt>
          )}
        </BreadcrumbBox>
      )}
    </>
  )
}
