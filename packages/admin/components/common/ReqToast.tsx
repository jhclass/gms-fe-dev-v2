import { styled } from 'styled-components'

const FromID = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
  width: inherit;
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`
const ReqText = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  width: inherit;
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export default function ReqToast() {
  return (
    <>
      <FromID>
        아무개아무개아무개아무개아무개아무개아무개아무개아무개아무개아무개아무개아무개아무개
      </FromID>
      <ReqText>
        여기여기여기에 요청요여기에 요청요여기에 요청요청요청 이런거 요청합니다.
        여기여기여기에 요청요여기에 요청요여기에 요청요청요청 이런거 요청합니다.
        여기여기여기에 요청요여기에 요청요여기에 요청요청요청 이런거 요청합니다.
        여기여기여기에 요청요여기에 요청요여기에 요청요청요청 이런거 요청합니다.
        여기여기여기에 요청요여기에 요청요여기에 요청요청요청 이런거 요청합니다.
      </ReqText>
    </>
  )
}
