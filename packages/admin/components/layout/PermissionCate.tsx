import { motion } from 'framer-motion'
import styled from 'styled-components'
import PermissionAddForm from '@/components/form/PermissionAddForm'
import PermissionEditForm from '@/components/form/PermissionEditForm'

const BoxArea = styled.div`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
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

export default function PermissionCate({ permission }) {
  return (
    <>
      <BoxArea>
        <BoxBtn>
          <PermissionAddForm permission={permission} />
        </BoxBtn>
        <PermissionEditForm permission={permission} />
      </BoxArea>
    </>
  )
}
