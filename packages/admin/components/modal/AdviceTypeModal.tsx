import styled from 'styled-components'
import {
  Button,
  CheckboxGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
} from '@nextui-org/react'
import AdviceTypeModalChip from './AdviceTypeModalChip'
import { Suspense } from 'react'

const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function AdviceTypeModal({
  isOpen,
  onClose,
  setValue,
  field,
  adviceTypeSelected,
  setAdviceTypeSelected,
}) {
  const handleAdviceChange = values => {
    setAdviceTypeSelected(values)
  }
  const clickAdviceSubmit = () => {
    setValue('adviceTypes', adviceTypeSelected)
    onClose()
  }

  return (
    <>
      <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                상담 분야 선택
              </ModalHeader>
              <ModalBody>
                <ScrollShadow className="scrollbar min-h-[10rem]">
                  <CheckboxGroup
                    orientation="horizontal"
                    className="gap-1 radioBox"
                    color="secondary"
                    value={adviceTypeSelected}
                    onValueChange={handleAdviceChange}
                  >
                    <Suspense
                      fallback={
                        <LodingDiv>
                          <i className="xi-spinner-2" />
                        </LodingDiv>
                      }
                    >
                      <AdviceTypeModalChip />
                    </Suspense>
                  </CheckboxGroup>
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    clickAdviceSubmit()
                    field.onChange(adviceTypeSelected)
                  }}
                >
                  선택
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
