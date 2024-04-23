import Layout from '@/components/wrappers/MainWrap'
import styled from 'styled-components'
import NewConsultMonthNum from '@/components/dashboard/NewConsultMonthNum '
import NewConsultNum from '@/components/dashboard/NewConsultNum'
import ConsultNum from '@/components/dashboard/ConsultNum'
import AdviceType from '@/components/dashboard/AdviceType'
import ReceiptDiv from '@/components/dashboard/ReceiptDiv'
import { useAuthRedirect } from '@/utils/useAuthRedirect'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/router'

const HomeArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 15.75rem);
  justify-content: center;
`

const Title = styled.div`
  text-align: center;
  font-size: 8rem;
  font-weight: 700;
`
const TextCon = styled.div`
  text-align: center;
  font-size: 1.8rem;
  margin-top: -1rem;
  font-weight: 700;
`
const SemiText = styled.div`
  text-align: center;
  margin-top: 1rem;
  display: block;
  font-size: 1rem;
  color: #71717a;
  font-weight: 400;
  margin-bottom: 2rem;
`

const Btnbox = styled.div`
  display: flex;
  gap: 1rem;
`

export default function NotFound() {
  const isCheckingLogin = useAuthRedirect()
  const router = useRouter()
  if (isCheckingLogin) {
    return null
  }

  return (
    <>
      <Layout>
        <HomeArea>
          <Title>4🥹4</Title>
          <TextCon>앗! 페이지가 없어요. ㅜ_ㅜ</TextCon>
          <SemiText>
            요청하신 페이지가 존재하지 않거나,
            <br />
            이름이 변경되었거나,
            <br />
            일시적으로 사용이 중단되었어요.
          </SemiText>
          <Btnbox>
            <Button color="primary" onClick={() => router.push('/')}>
              메인으로
            </Button>
            <Button
              variant="bordered"
              color="primary"
              className="bg-white"
              onClick={() => router.back()}
            >
              이전으로
            </Button>
          </Btnbox>
        </HomeArea>
      </Layout>
    </>
  )
}
