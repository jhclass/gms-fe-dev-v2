import Layout from '@/pages/layout'
import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import FormTopInfo from '@/components/common/FormTopInfo'
import { ko } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
const _ = require('lodash')
import { getYear, format } from 'date-fns'
import DOMPurify from 'dompurify'

import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { useMemo, useRef, useState, useEffect } from 'react'
import ReactQuill, { ReactQuillProps } from 'react-quill'
import { styled } from 'styled-components'
import EditorViewer from '@/components/EditorViewer'
import Editor from '@/components/Editor'
import { useQuery } from '@apollo/client'

import { useRouter } from 'next/router'
import message from '@/pages/message'
import { MME_QUERY } from '@/graphql/queries'
import axios from 'axios'
import { SEARCH_WORKBOARD_QUERY } from '@/graphql/queries'
import { fileURLToPath } from 'url'

const ConArea = styled.div`
  width: 100%;
  max-width: 1400px;
`
const DetailBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`
const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
  font-size: 0.8rem;
  @media (max-width: 768px) {
    align-items: flex-end;
    flex-direction: column-reverse;
  }
`
const Noti = styled.p`
  span {
    color: red;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const AreaTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
`

const FilterLabel = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.black};

  span {
    color: red;
  }
`

const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`
const TimeBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;

  p {
    height: 40px;
    line-height: 40px;
  }
`
const FileBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;

  p {
    height: 40px;
    line-height: 40px;
  }
  span {
    display: flex;

    align-items: center;
    gap: 0.2rem;
    font-size: 0.875rem;
    padding: 12px;
  }
  a {
    display: flex;

    align-items: center;
    gap: 0.2rem;
    font-size: 0.875rem;
    padding: 12px;
  }
`
const EditorBox = styled.div`
  .contentArea {
    min-height: 12rem;
    line-height: 1.7;
    word-break: break-word;
  }

  .contentArea img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0.75rem 0;
  }
`

export default function testEditor() {
  const router = useRouter()
  const years = _.range(1950, getYear(new Date()) + 1, 1)

  const {
    data: searchWorkBoardData,
    loading,
    error,
  } = useQuery(SEARCH_WORKBOARD_QUERY, {
    variables: {
      searchWorkBoardDto: { id: Number(router?.query?.id) },
    },
  })
  const mMe = useQuery(MME_QUERY)
  const boardDetailInfo = searchWorkBoardData?.searchWorkBoard?.data?.[0]
  //비교
  console.log(searchWorkBoardData)
  return (
    <MainWrap>
      <ConArea>
        <Breadcrumb rightArea={false} isFilter={false} />
        <DetailBox>
          <FormTopInfo item={null} noti={true} time={false} />
          <div>
            <DetailDiv>
              <FlexBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="글 제목"
                    variant="bordered"
                    radius="md"
                    type="text"
                    className="w-full"
                    maxLength={100}
                    label={
                      <FilterLabel>
                        글 제목<span>*</span>
                      </FilterLabel>
                    }
                    value={boardDetailInfo?.title ? boardDetailInfo?.title : ''}
                    readOnly
                  />
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="작성자"
                    variant="bordered"
                    radius="md"
                    type="text"
                    className="w-full"
                    maxLength={12}
                    value={
                      boardDetailInfo?.writer ? boardDetailInfo?.writer : ''
                    }
                    readOnly={true}
                    label={<FilterLabel>작성자</FilterLabel>}
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="전달 부서 또는 팀"
                    variant="bordered"
                    radius="md"
                    type="text"
                    className="w-full"
                    maxLength={12}
                    label={<FilterLabel>전달 부서 또는 팀</FilterLabel>}
                    readOnly
                    value={
                      boardDetailInfo?.toTeam
                        ? boardDetailInfo?.toTeam
                        : '지정안함'
                    }
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="전달 개인 추가"
                    variant="bordered"
                    radius="md"
                    type="text"
                    className="w-full"
                    maxLength={12}
                    label={<FilterLabel>전달 개인 추가</FilterLabel>}
                    readOnly
                    value={
                      boardDetailInfo?.toPerson
                        ? boardDetailInfo?.toPerson
                        : '지정 안함'
                    }
                  />
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="작업 난이도"
                    variant="bordered"
                    radius="md"
                    type="text"
                    className="w-full"
                    maxLength={12}
                    label={<FilterLabel>작업 난이도</FilterLabel>}
                    value={
                      boardDetailInfo?.level
                        ? boardDetailInfo?.level
                        : '선택 안함'
                    }
                    readOnly
                    disabled
                  />
                </AreaBox>

                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="작업 시작일"
                    variant="bordered"
                    radius="md"
                    type="text"
                    className="w-full"
                    maxLength={12}
                    label={<FilterLabel>작업 시작일</FilterLabel>}
                    value={
                      boardDetailInfo?.startDate
                        ? format(
                            new Date(Number(boardDetailInfo?.startDate)),
                            'yyyy-MM-dd',
                          )
                        : '지정 안함'
                    }
                    disabled
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="작업 종료일"
                    variant="bordered"
                    radius="md"
                    type="text"
                    className="w-full"
                    maxLength={12}
                    label={<FilterLabel>작업 종료일</FilterLabel>}
                    value={
                      boardDetailInfo?.endDate
                        ? format(
                            new Date(Number(boardDetailInfo?.endDate)),
                            'yyyy-MM-dd',
                          )
                        : '지정 안함'
                    }
                    disabled
                  />
                </AreaBox>

                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="작업 진행 상태"
                    variant="bordered"
                    radius="md"
                    type="text"
                    className="w-full"
                    maxLength={12}
                    label={<FilterLabel>작업 진행 상태</FilterLabel>}
                    value={
                      boardDetailInfo?.workStatus
                        ? boardDetailInfo?.workStatus
                        : '선택안함'
                    }
                    disabled
                  />
                </AreaBox>
              </FlexBox>
              <EditorBox>
                <h3
                  style={{
                    fontSize: '0.875rem',
                    color: '#11181C',
                    fontWeight: 500,
                  }}
                >
                  전달 내용 상세
                </h3>
                <div
                  className="contentArea mt-2 border border-offWhite border-2 rounded-xl shadow-sm p-[0.75em]"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(boardDetailInfo?.detail || ''),
                  }}
                ></div>
              </EditorBox>
              <FlexBox>
                <AreaBox>
                  <FilterLabel className="file mb-1">등록 된 파일</FilterLabel>
                  <FileBox>
                    {boardDetailInfo?.fileName ? (
                      <a href={boardDetailInfo?.filePath}>
                        <i className="xi-file-o"></i>
                        {boardDetailInfo?.fileName}
                      </a>
                    ) : (
                      <span>
                        <i className="xi-close"></i> No file
                      </span>
                    )}
                  </FileBox>
                </AreaBox>
              </FlexBox>
              <BtnBox>
                <Button
                  type="button"
                  //type="button"
                  size="md"
                  radius="md"
                  variant="solid"
                  color="primary"
                  className="w-full text-white"
                  onClick={() =>
                    router.push(`/workboard/edit/${router.query.id}`)
                  }
                >
                  수정
                </Button>
                <Button
                  variant="bordered"
                  color="primary"
                  className="w-full text-primary"
                  onClick={() => router.back()}
                >
                  이전으로
                </Button>
              </BtnBox>
            </DetailDiv>
          </div>
        </DetailBox>
      </ConArea>
    </MainWrap>
  )
}
testEditor.getLayout = page => <Layout>{page}</Layout>
