import { useState } from 'react'
import { styled } from 'styled-components'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'

const TitleLabel = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  padding-bottom: 0.3rem;
  display: block;
  cursor: normal;
`
const SelectListText = styled.div`
  border-width: 0.15rem;
  border-radius: var(--nextui-radius-medium);
  border-color: #e4e4e7;
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  -webkit-tap-highlight-color: transparent;
  padding: 0.5rem 0.75rem;
  min-height: 2.5rem;
`

export default function ClickList({
  list,
  subjectSelected,
  setSubjectSelected,
  onChange,
  isOPenModal,
  setIsOPenModal,
}) {
  const [selectCheck, setSelectCheck] = useState(subjectSelected)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const handleCheckboxChange = values => {
    setSelectCheck(values)
  }
  const clickSubmit = () => {
    setSubjectSelected(selectCheck)
    onChange(selectCheck)
    setIsOPenModal(false)
    onClose
  }

  return (
    <>
      <div onClick={onOpen}>asdfasdf</div>
      <Modal size={'2xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <CheckboxGroup
                  value={selectCheck}
                  onChange={handleCheckboxChange}
                >
                  {list?.map(item => (
                    <Checkbox key={item.id} value={item.subjectName}>
                      {item.subjectName}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={clickSubmit}>
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
