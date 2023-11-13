import { navOpenState } from '@/lib/recoilAtoms'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { styled } from 'styled-components'

type CategoryItemProps = {
  href: string
  iconSrc: string
  alt: string
  label: string
  isActive: boolean
  onClick: () => void
}

const CateItem = styled(motion.div)`
  position: relative;
  z-index: 40;
  margin-top: 0.25rem;
`

const CateLink = styled(motion.span)<{ $navOpen: boolean }>`
  line-height: 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  column-gap: ${props => (props.$navOpen ? '0.75rem' : '0')};
  justify-content: ${props => (props.$navOpen ? 'start' : 'center')};
  display: flex;
  width: 100%;
  height: 100%;
  color: inherit;
`

const CateIcon = styled.figure`
  width: 1.5rem;
  height: 1.5rem;
`

const CateActive = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  background: #007de9;
  z-index: -1;
  border-radius: 0.375rem;
  width: 100%;
  height: 100%;
`

const cateName = {
  close: {
    scale: 0.5,
    opacity: 0,
    width: 0,
    height: 0,
    transition: {},
  },
  open: {
    scale: 1,
    opacity: 1,
    width: '100%',
    transition: {},
  },
}

export default function CategoryItem<CategoryItemProps>({
  href,
  iconSrc,
  alt,
  label,
  isActive,
  onClick,
}) {
  const [navOpen] = useRecoilState(navOpenState)

  return (
    <>
      <CateItem
        onClick={onClick}
        animate={{
          color: isActive ? '#fff' : '#007de9',
          transition: { duration: 0.2 },
        }}
      >
        <Link href={href}>
          <CateLink $navOpen={navOpen}>
            <CateIcon>
              <img src={iconSrc} alt={alt} />
            </CateIcon>
            <motion.span
              variants={cateName}
              initial={navOpen ? 'close' : 'open'}
              animate={navOpen ? 'open' : 'close'}
              transition={{
                type: 'easeInOut',
              }}
            >
              {label}
            </motion.span>
          </CateLink>
        </Link>

        {isActive && (
          <CateActive className="activeCate" layoutId="activeCate" />
        )}
      </CateItem>
    </>
  )
}
