import { Button, Input } from '@nextui-org/react'
import Head from 'next/head'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const FlexBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: end;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
`

const FilterLabel = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  color: #11181c;

  span {
    color: red;
  }
`

export default function Address({
  setValue,
  valueName,
  defaultPostcode = '',
  defaultAddress = '',
  defaultDetails = '',
}) {
  const [postcode, setPostcode] = useState('')
  const [roadAddress, setRoadAddress] = useState('')

  useEffect(() => {
    if (defaultPostcode !== '') {
      setPostcode(defaultPostcode)
    } else {
      setPostcode('')
    }
    if (defaultAddress !== '') {
      setRoadAddress(defaultAddress)
    } else {
      setRoadAddress('')
    }
  }, [defaultAddress, defaultPostcode])

  const handleClick = () => {
    const isMobile = window.innerWidth <= 768
    const width = isMobile ? window.innerWidth * 0.9 : 500
    const height = isMobile ? window.innerHeight * 0.7 : 500
    const left = isMobile
      ? (window.innerWidth - width) / 2
      : Math.ceil((window.screen.width - width) / 2)
    const top = isMobile
      ? (window.innerHeight - height) / 2
      : Math.ceil((window.screen.height - height) / 2)

    new (window as any).daum.Postcode({
      width: width,
      height: height,
      oncomplete: (data: any) => {
        const roadAddr = data.roadAddress
        let extraRoadAddr = ''

        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraRoadAddr +=
            extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName
        }
        if (extraRoadAddr !== '') {
          extraRoadAddr = ' (' + extraRoadAddr + ')'
        }

        setPostcode(data.zonecode)
        setRoadAddress(roadAddr)
        setValue(valueName, roadAddr, { shouldDirty: true })
      },
    }).open({
      popupTitle: '우편번호 검색 팝업',
      popupKey: 'addressPopup1',
      left: left,
      top: top,
    })
  }

  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
      <FlexBox>
        <AreaBox>
          <div className="flex items-end gap-3">
            <Input
              type="text"
              id="sample4_postcode"
              defaultValue={defaultPostcode}
              label={<FilterLabel>주소</FilterLabel>}
              placeholder="우편번호"
              labelPlacement="outside"
              variant="flat"
              radius="md"
              className="w-full"
              value={postcode !== '' ? postcode : defaultPostcode}
              readOnly
            />
            <Button
              onClick={handleClick}
              className="text-white"
              size="md"
              radius="md"
              variant="solid"
              color="primary"
            >
              주소 검색
            </Button>
          </div>
        </AreaBox>
        <AreaBox>
          <Input
            type="text"
            id="sample4_roadAddress"
            placeholder="주소"
            labelPlacement="outside"
            variant="flat"
            radius="md"
            defaultValue={defaultAddress}
            value={roadAddress !== '' ? roadAddress : defaultAddress}
            className="w-full"
            readOnly
          />
        </AreaBox>
        <AreaBox>
          <Input
            type="text"
            defaultValue={defaultDetails}
            id="sample4_detailAddress"
            placeholder="상세주소"
            labelPlacement="outside"
            radius="md"
            variant="bordered"
            className="w-full"
          />
        </AreaBox>
      </FlexBox>
    </>
  )
}
