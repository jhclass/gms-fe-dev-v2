import styled from 'styled-components'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import useUserLogsMutation from '@/utils/userLogs'
import { useState } from 'react'

const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const FlexBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`
const LineBox = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-bottom: 2px solid hsl(240 6% 90%);
  height: 40px;
  line-height: 40px;
  font-size: 0.875rem;
`
const TextBox = styled.div`
  font-size: 0.875rem;
  flex: 1;
  width: 100%;
  background: hsl(240 6% 95%);
  padding: 0.5rem;
  border-radius: 0.5rem;

  b {
    display: Block;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  span {
    padding-left: 0.5rem;
    color: #71717a;
  }
`
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
  font-size: 0.875rem;
`

const ImgBox = styled.figure`
  border-top: 2px solid #007de9;
  padding: 1rem;
  margin-top: 1rem;
  flex: 1;
  width: 100%;
  font-size: 0.875rem;

  p {
    /* color: #71717a; */
    text-align: center;
    margin-bottom: 1rem;
  }
`

const ImgFigure = styled.figure`
  width: 100%;
  margin: 0 auto;
  border: 1px solid #71717a;
`

export default function NotiModal({ isOpen, onClose }) {
  return (
    <>
      <Modal size={'md'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                주의사항
              </ModalHeader>
              <ModalBody>
                <ScrollShadow className="scrollbar min-h-[10rem] max-h-[25rem]">
                  <DetailDiv>
                    <FlexBox>
                      <TextBox>
                        <b>
                          전기통신사업법 제84조의2
                          <br />
                          (전화번호의 거짓표시 금지 및 이용자 보호)
                        </b>
                        ① 누구든지 다른 사람을 속여 재산상 이익을 취하거나
                        폭언ㆍ협박ㆍ희롱 등의 위해를 입힐 목적으로
                        전화(문자메시지를 포함한다. 이하 이 조에서 같다)를
                        하면서 송신인의 전화번호를 변작하는 등 거짓으로
                        표시하여서는 아니 된다.
                        <br />② 누구든지 영리를 목적으로 송신인의 전화번호를
                        변작하는 등 거짓으로 표시할 수 있는 서비스를
                        제공하여서는 아니 된다. 다만, 공익을 목적으로 하거나
                        수신인에게 편의를 제공하는 등 정당한 사유가 있는
                        경우에는 그러하지 아니하다.
                        <br />③ 전기통신사업자는 거짓으로 표시된 전화번호로 인한
                        이용자의 피해를 예방하기 위하여 다음 각 호의 조치를
                        하여야 한다. 다만, 제2항 단서에 따른 정당한 사유가 있는
                        경우는 제외한다.
                        <br />
                        <span>
                          1. 변작 등 거짓으로 표시된 전화번호의 전화 발신을
                          차단하거나 송신인의 정상적인 전화번호로 정정하여
                          수신인에게 송출하기 위한 조치
                        </span>
                        <br />
                        <span>
                          2. 국외에서 국내로 발신된 전화에 대한 국외발신 안내를
                          위한 조치
                        </span>
                        <br />
                        <span>
                          3. 변작 등 거짓으로 표시한 전화번호를 송신한 자의 해당
                          회선에 대한 전기통신역무 제공의 중지를 위한 조치
                        </span>
                        <br />
                        <span>
                          4. 그 밖에 이용자 보호를 위하여
                          과학기술정보통신부장관이 정하는 사항
                        </span>
                        <br />④ 과학기술정보통신부장관은 제3항에 따른 조치의
                        이행 여부를 확인하거나 이용자의 피해가 확산되는 것을
                        방지하기 위하여 전기통신사업자에게 다음 각 호에 해당하는
                        자료의 열람ㆍ제출을 요청하거나 필요한 검사를 할 수 있다.
                        <br />
                        <span>
                          1. 변작 등 거짓으로 표시된 전화번호의 전화 발신을
                          차단한 경우 해당 전화번호, 차단시각, 발신 사업자명
                        </span>
                        <br />
                        <span>
                          2. 수신자가 변작 등 거짓으로 표시된 전화번호에 대하여
                          신고한 경우 발신 사업자명
                        </span>
                        <br />
                        <span>
                          3. 그 밖에 제3항 각 호의 조치 이행 여부를 확인할 수
                          있는 관계 자료
                        </span>
                        <br />⑤ 과학기술정보통신부장관은 제3항에 따른 조치의
                        이행 여부를 확인하고 제4항에 따른 조치를 시행하기 위하여
                        대통령령으로 정하는 바에 따라 「정보통신망 이용촉진 및
                        정보보호 등에 관한 법률」 제52조에 따른
                        한국인터넷진흥원에 업무를 위탁하고 이에 소요되는 비용을
                        지원할 수 있다.
                        <br />⑥ 과학기술정보통신부장관은 제2항 단서에 따른
                        정당한 사유, 제3항 각 호에 따른 조치 및 제4항의 이행을
                        위한 구체적인 절차ㆍ방법을 정하여 고시할 수 있다.
                        <br />⑦ 제4항에 따른 자료의 열람ㆍ제출 및 검사에
                        대하여는 「정보통신망 이용촉진 및 정보보호 등에 관한
                        법률」 제64조, 제64조의2 및 제69조를 준용한다.
                      </TextBox>
                      <AreaBox>
                        전기통신사업법 제84조의 2에 의거하여 거짓으로 표시된
                        전화번호로 인한 이용자 피해 예방을 위하여 사전에
                        등록되지 않은 발신 번호로는 SMS메시지 발송이 제한됩니다.
                        <br /> <br />
                        이에 통신서비스 이용증명원은 SMS(문자) 서비스 이용 및
                        발송 시 발신자 번호 등록을 위해 필요한 서류로, 각 통신사
                        홈페이지에 문의하여 발급 받을 수 있습니다.
                      </AreaBox>
                      <ImgBox>
                        <p>이용증명원 예시이미지</p>
                        <ImgFigure>
                          <img
                            src="https://highclass-image.s3.amazonaws.com/admin/common/exImage.webp"
                            alt="이용증영원 예시"
                          />
                        </ImgFigure>
                      </ImgBox>
                    </FlexBox>
                  </DetailDiv>
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                {/* <Button
                  size="sm"
                  color="danger"
                  variant="light"
                  onPress={closePopup}
                >
                  Close
                </Button> */}
                <Button size="sm" color="primary" onPress={onClose}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
