import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
// import Button from '@/components/common/Button'
import { Button, Input, useDisclosure } from '@nextui-org/react'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import { useLazyQuery, useMutation, useSuspenseQuery } from '@apollo/client'
import { CREATE_ADVICE_TYPE_MUTATION } from '@/graphql/mutations'
import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import CreateAdviceTypeChip from './CreateAdviceTypeChip'
import { Suspense, useEffect, useState } from 'react'
import TypeIndex from '@/components/modal/TypeIndex'
import { ResultAdviceType } from '@/src/generated/graphql'

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
const FilterForm = styled.form`
  display: flex;
  width: 100%;
  gap: 1rem;
`
const BoxTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
const MoreBtn = styled.div`
  border-top: 1px solid #eee;
  display: flex;
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
const FlexBox = styled.div`
  display: flex;
  width: 50%;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 1rem;
  }
`

const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 70%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
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
type seeAdviceTypeQuery = {
  seeAdviceType: ResultAdviceType
}
export default function CreateAdviceType({ isActive }) {
  const { userLogs } = useUserLogsMutation()
  const [createAdvice] = useMutation(CREATE_ADVICE_TYPE_MUTATION)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(50)
  const [adviceList, setAdviceList] = useState([])
  const [orderPage, setOrderPage] = useState(1)
  const [orderAdviceList, setOrderAdviceList] = useState([])
  const {
    error,
    data,
    refetch: seeRefetch,
  } = useSuspenseQuery<seeAdviceTypeQuery>(SEE_ADVICE_TYPE_QUERY, {
    variables: {
      page: page,
      category: '상담분야',
      limit: limit,
    },
  })
  const totalCount = data?.seeAdviceType.totalCount
  // const [seeAdviceQuery] = useLazyQuery(SEE_ADVICE_TYPE_QUERY, {
  //   onCompleted: result => {
  //     const orederAdvice = result?.seeAdviceType.adviceType
  //     setOrderAdviceList(orederAdvice)
  //   },
  // })
  const [seeAdviceQuery, { refetch: orderRefetch }] = useLazyQuery(
    SEE_ADVICE_TYPE_QUERY,
    {
      onCompleted: result => {
        if (orderPage === 1) {
          setOrderAdviceList(result.seeAdviceType.adviceType)
        } else {
          const newAdvice = result?.seeAdviceType.adviceType
          setOrderAdviceList(prevList => [...prevList, ...newAdvice])
        }
      },
    },
  )

  const {
    isOpen: typeIsOpne,
    onOpen: typeOnOPen,
    onClose: typeOnClose,
  } = useDisclosure()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      type: '',
    },
  })

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setAdviceList(data.seeAdviceType.adviceType)
      } else {
        setAdviceList(prevList => [
          ...prevList,
          ...data.seeAdviceType.adviceType,
        ])
      }
    }
  }, [data])

  const openOrderChange = () => {
    seeAdviceQuery({
      variables: {
        page: 1,
        category: '상담분야',
        limit: 30,
      },
    })
    typeOnOPen()
  }

  const onSubmit = async data => {
    if (!isDirty) return

    try {
      const result = await createAdvice({
        variables: {
          type: data.type,
          indexNum: totalCount + 1,
          category: '상담분야',
        },
      })
      if (!result.data.createAdviceType.ok) {
        throw new Error('상담 분야 등록 실패')
      }
      seeRefetch({
        page: 1,
        category: '상담분야',
        limit: 50,
      })
      alert('상담 분야가 등록되었습니다.')
      userLogs(`${data.type} 상담분야 등록`)
      reset()
    } catch (error) {
      console.error('상담 분야 등록 중 에러 발생:', error)
    }
  }

  const loadMore = () => {
    if (page < Math.ceil(totalCount / limit)) {
      setPage(prevPage => prevPage + 1)
    }
  }

  return (
    <>
      <FilterBox
        variants={FilterVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <BoxArea>
          <BoxBtn>
            <FilterForm onSubmit={handleSubmit(onSubmit)}>
              <ItemBox>
                <InputBox>
                  <Input
                    labelPlacement="outside-left"
                    placeholder="2글자 이상 작성해주세요."
                    type="text"
                    variant="bordered"
                    label="분야명"
                    classNames={{
                      label: ['w-[4rem]'],
                      mainWrapper: ['w-[calc(100%-4rem)]'],
                    }}
                    onChange={e => {
                      register('type').onChange(e)
                    }}
                    {...register('type', {
                      minLength: {
                        value: 2,
                        message: '2글자 이상 작성해주세요',
                      },
                    })}
                  />
                  {errors.type && (
                    <p className="w-full ml-[4.5rem] text-xs text-red-500">
                      {String(errors.type.message)}
                    </p>
                  )}
                </InputBox>
                <FlexBox>
                  <Button
                    type="submit"
                    color="primary"
                    size="md"
                    className="w-[50%]"
                  >
                    등록
                  </Button>
                  <Button
                    type="button"
                    color="primary"
                    size="md"
                    variant="bordered"
                    className="w-[50%]"
                    onClick={openOrderChange}
                  >
                    순서변경
                  </Button>
                </FlexBox>
              </ItemBox>
            </FilterForm>
          </BoxBtn>
          <BoxTop>
            <CreateAdviceTypeChip
              adviceList={adviceList}
              refetch={seeRefetch}
              category={'상담분야'}
            />
          </BoxTop>
          {page < Math.ceil(totalCount / limit) && (
            <MoreBtn>
              <Button
                color="primary"
                onClick={loadMore}
                className="bg-[transparent] w-[100%] text-[#11181c]"
              >
                더보기{' '}
                <span className="text-primary text-[1rem]">
                  <i className="xi-plus-circle" />
                </span>
              </Button>
            </MoreBtn>
          )}
        </BoxArea>
      </FilterBox>
      {typeIsOpne && (
        <TypeIndex
          isOpen={typeIsOpne}
          onClose={typeOnClose}
          refetch={seeRefetch}
          orderAdviceList={orderAdviceList}
          orderPage={orderPage}
          setOrderPage={setOrderPage}
          seeAdviceQuery={seeAdviceQuery}
          totalCount={totalCount}
          category={'상담분야'}
          limit={limit}
          orderRefetch={orderRefetch}
        />
      )}
    </>
  )
}
