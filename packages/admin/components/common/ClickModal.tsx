import { useState } from 'react'
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

export default function ClickList({
  list,
  subjectSelected,
  setSubjectSelected,
  onChange,
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
