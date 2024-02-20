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
import { useQuery } from '@apollo/client'
import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'
import ChipCheckbox from '@/components/common/ChipCheckbox'

const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  color: #71717a;
`

export default function AdviceTypeModal({
  isOpen,
  onClose,
  setValue,
  field,
  adviceTypeSelected,
  setAdviceTypeSelected,
}) {
  const { loading, error, data } = useQuery(SEE_ADVICE_TYPE_QUERY)
  const adviceList = data?.seeAdviceType.adviceType || []

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
                    {adviceList !== null &&
                      adviceList?.map((item, index) => (
                        <ChipCheckbox key={item.id} value={item.type}>
                          {item.type}
                        </ChipCheckbox>
                      ))}
                    {adviceList === null && (
                      <Nolist>등록된 분야가 없습니다.</Nolist>
                    )}
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
