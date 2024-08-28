import { styled } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Textarea } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import { CREATE_REGULAR_EVALUATION_SET_MUTATION } from '@/graphql/mutations'
import { useForm } from 'react-hook-form'
import useUserLogsMutation from '@/utils/userLogs'
import { useRef, useState } from 'react'
import PortfolioList from '@/components/layout/PortfolioList'

const DetailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex: 1 3;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const AreaBox = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
`

const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.black};
  padding-bottom: 0.1rem;
  display: block;

  span {
    color: red;
  }
`

const FilesBox = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex-wrap: wrap;
`
const FilesBtn = styled.button`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  width: 5rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.lightPrimary};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 3rem;
  text-align: center;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  /* @media (max-width: 768px) {
    width: 100%;
  } */
`
const FilesItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  align-items: center;
`

const FilesItem = styled.div`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  width: 5rem;
  height: 5rem;
  background-color: #fff;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 4rem;
  text-align: center;
  color: #fff;
  font-weight: 700;
`
const FilesDelBtn = styled.button`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray};
`

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.75rem;
  width: 5rem;

  @media (max-width: 768px) {
    padding-top: 0;
    width: 100%;
  }
`

export default function PortfolioForm({ setIsCreate }) {
  const { userLogs } = useUserLogsMutation()
  const [createRegularEvaluationSet] = useMutation(
    CREATE_REGULAR_EVALUATION_SET_MUTATION,
  )
  const [avatarImg, setAvatartImg] = useState([])
  const [validFiles, setValidFiles] = useState([])
  const fileInputRef = useRef(null)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    setValue,
    control,
    formState,
  } = useForm()
  const { errors } = formState
  const onSubmit = data => {
    console.log('validFiles', validFiles)
    console.log(data)
    // createRegularEvaluationSet({
    //   variables: {
    //     subjectId: subjectId,
    //     statusType: data.statusType === '' ? null : data.statusType,
    //     evaluationDetails:
    //       data.evaluationDetails === '' ? null : data.evaluationDetails,
    //     points: data.points === '' ? 0 : parseInt(data.points),
    //   },
    //   refetchQueries: [SEE_REGULAREVALUATION_SET_QUERY],
    //   onCompleted: result => {
    //     userLogs(
    //       `${data.statusType} 정기평가 내용 설정`,
    //       `ok: ${result.createRegularEvaluationSet.ok}`,
    //     )
    //     if (result.createRegularEvaluationSet.ok) {
    //       setIsCreate(true)
    //       alert(`정기평가 내용이 설정되었습니다.`)
    //       reset()
    //     }
    //   },
    // })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
    const files = event.target.files

    if (files && files.length > 0) {
      const newValidFiles = []

      Array.from(files).forEach(file => {
        if (file.size > MAX_FILE_SIZE) {
          setError('portfolio', {
            type: 'manual',
            message: '파일이 너무 큽니다. 10MB 이하만 가능합니다.',
          })
        } else {
          newValidFiles.push(file)
        }
      })

      if (newValidFiles.length > 0) {
        clearErrors('portfolio')

        // 기존 validFiles와 새로운 validFiles를 합칩니다.
        setValidFiles(prevValidFiles => [...prevValidFiles, ...newValidFiles])

        newValidFiles.forEach(file => {
          const reader = new FileReader()
          reader.onloadend = () => {
            setAvatartImg(prev => [...prev, reader.result])
          }
          reader.readAsDataURL(file)
        })
      }
    }
  }
  const handleRemoveFile = (index: number) => {
    setValidFiles(prevValidFiles => {
      const updatedFiles = [...prevValidFiles]
      updatedFiles.splice(index, 1)
      return updatedFiles
    })

    setAvatartImg(prevAvatartImg => {
      const updatedAvatartImg = [...prevAvatartImg]
      updatedAvatartImg.splice(index, 1)
      return updatedAvatartImg
    })
  }
  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  return (
    <>
      <DetailForm onSubmit={handleSubmit(onSubmit)}>
        <FlexBox>
          <div>
            <FilterLabel>
              포토폴리오<span>*</span>
            </FilterLabel>
            <FilesBox>
              {avatarImg?.map((img, index) => (
                <FilesItemBox key={index}>
                  <FilesItem
                    style={{
                      backgroundImage: `url('${img}')`,
                    }}
                  />
                  <FilesDelBtn
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <i className="xi-close-circle" />
                  </FilesDelBtn>
                </FilesItemBox>
              ))}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                multiple
              />
              <FilesBtn type="button" onClick={handleButtonClick}>
                <i className="xi-plus" />
              </FilesBtn>
            </FilesBox>
          </div>
          {errors.portfolio && (
            <p className="px-2 pt-2 text-xs text-red">
              {String(errors.portfolio.message)}
            </p>
          )}
        </FlexBox>
        <FlexBox>
          <AreaBox>
            <Textarea
              label={
                <FilterLabel>
                  한줄 평가<span>*</span>
                </FilterLabel>
              }
              labelPlacement="outside"
              className="max-w-full"
              variant="bordered"
              minRows={5}
              onChange={e => {
                register('evaluationDetails').onChange(e)
              }}
              {...register('evaluationDetails', {
                required: {
                  value: true,
                  message: '한줄 평가를 입력해주세요.',
                },
              })}
            />
            {errors.evaluationDetails && (
              <p className="px-2 pt-2 text-xs text-red">
                {String(errors.evaluationDetails.message)}
              </p>
            )}
          </AreaBox>
          <BtnBox>
            <Button
              type="submit"
              size="md"
              radius="md"
              color="primary"
              className="lg:w-[50%] w-full"
            >
              추가
            </Button>
          </BtnBox>
        </FlexBox>
        <PortfolioList />
      </DetailForm>
    </>
  )
}
