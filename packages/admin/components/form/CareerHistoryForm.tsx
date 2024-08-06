import { CREATE_CAREER_MUTATION } from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import { useMutation } from '@apollo/client'
import { Button, Input, ScrollShadow } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { styled } from 'styled-components'

const TableArea = styled.div`
  padding-bottom: 1.5rem;
`

const TableWrap = styled.div`
  width: 100%;
  display: table;
  min-width: 1200px;
`
const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: table-row;
  flex-wrap: nowrap;
  row-gap: 1rem;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  text-align: center;
`

const TheaderBox = styled.div`
  display: flex;
`

const ClickBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  span {
    color: ${({ theme }) => theme.colors.red};
  }
`

const ClickForm = styled.form`
  display: flex;
  width: 100%;
  align-items: flex-start;
`
const Ttext = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 84%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.84}px;
`

const Tbtn = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 16%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.16}px;
`
const TableItem = styled.div`
  position: relative;
  width: 100%;
  min-width: fit-content;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  border-radius: 0.5rem;
  background: #fff;
  overflow: hidden;
`

const TableRow = styled.div`
  display: flex;
`
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`

export default function CareerHistoryForm({ paymentId, subjectId }) {
  const { userLogs } = useUserLogsMutation()
  const [createCareer] = useMutation(CREATE_CAREER_MUTATION)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    createCareer({
      variables: {
        careerDetails: data.careerDetails === '' ? null : data.careerDetails,
        subjectId: subjectId,
        studentPaymentId: paymentId,
      },
      onCompleted: result => {
        userLogs(
          `paymentId: ${paymentId} 경력 등록`,
          `ok: ${result.createCareer.ok}`,
        )
        if (result.createCareer.ok) {
          alert('경력이 추가되었습니다.')
          reset()
        }
      },
    })
  }

  return (
    <TableArea>
      <ScrollShadow orientation="horizontal" className="scrollbar">
        <TableWrap>
          <Theader>
            <TheaderBox>
              <ClickBox>
                <Ttext>
                  경력 내용 <span>*</span>
                </Ttext>
                <Tbtn></Tbtn>
              </ClickBox>
            </TheaderBox>
          </Theader>
          <TableItem>
            <TableRow>
              <ClickForm onSubmit={handleSubmit(onSubmit)}>
                <Ttext>
                  <Input
                    labelPlacement="outside"
                    variant="bordered"
                    radius="sm"
                    size="sm"
                    type="text"
                    placeholder=" "
                    className="w-full"
                    {...register('careerDetails', {
                      required: {
                        value: true,
                        message: '경력내용을 작성해주세요',
                      },
                    })}
                  />
                  {errors.careerDetails && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.careerDetails.message)}
                    </p>
                  )}
                </Ttext>
                <Tbtn>
                  <BtnBox>
                    <Button
                      type="submit"
                      size="sm"
                      variant="solid"
                      color="primary"
                      className="w-full text-white bg-secondary"
                    >
                      추가
                    </Button>
                  </BtnBox>
                </Tbtn>
              </ClickForm>
            </TableRow>
          </TableItem>
        </TableWrap>
      </ScrollShadow>
    </TableArea>
  )
}
