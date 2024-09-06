import { motion } from 'framer-motion'
import styled from 'styled-components'
import PermissionAdd from '@/components/form/PermissionAdd'
import PermissionEdit from '@/components/form/PermissionEdit'

const FilterBox = styled(motion.div)`
  z-index: 2;
  position: relative;
`
const BoxArea = styled.div`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  flex-direction: column;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const BoxBtn = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;
  justify-content: space-between;
  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
  }
  max-width: 1400px;
`
const FilterVariants = {
  hidden: {
    scaleY: 0,
    transformOrigin: 'top',
    height: 0,
  },
  visible: {
    scaleY: 1,
    transformOrigin: 'top',
    height: 'auto',
    transition: {
      duration: 0.3,
    },
  },
}

export default function PermissionCate({ isActive, permission }) {
  return (
    <>
      <div className="w-[calc(50%-1rem)]">
        <FilterBox
          variants={FilterVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          <BoxArea>
            <BoxBtn>
              <PermissionAdd permission={permission} />
            </BoxBtn>
            <PermissionEdit permission={permission} />
          </BoxArea>
        </FilterBox>
      </div>
    </>
  )
}
