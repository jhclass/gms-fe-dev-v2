import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useState } from 'react'

type CustomRippleButtonProps = {
  buttonType?: 'button' | 'submit' | 'reset'
  width?: string
  height?: string
  radius?: string
  bgColor?: string
  fontColor?: string
  fontSize?: string
  typeBorder?: boolean
  borderColor?: string
  bWidth?: string
  children?: React.ReactNode
  onClick?: () => void
}

const Btn = styled(motion.button)<{
  $width: string
  $height: string
  $radius: string
  $fontSize: string
  $bgColor: string
  $fontColor: string
  $typeBorder: boolean
  $borderColor: string
  $bWidth: string
}>`
  position: relative;
  width: ${props => props.$width || '100%'};
  min-height: 1.5rem;
  height: ${props => props.$height || '3rem'};
  padding: 0.375rem 0.75rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
  background-color: ${props =>
    props.$typeBorder
      ? props.$bgColor
        ? props.$bgColor
        : 'transparent'
      : props.$bgColor || '#007de9'};
  overflow: hidden;
  font-size: ${props => props.$fontSize || '0.9rem'};
  border: ${props =>
    props.$typeBorder
      ? props.$borderColor
        ? `${props.$bWidth || '1px'} solid ${props.$borderColor}`
        : `${props.$bWidth || '1px'} solid ${props.$bgColor}`
      : '#007de9'};
  border-radius: ${props => props.$radius || '0.75rem'};
  color: ${props =>
    props.$typeBorder
      ? props.$fontColor
        ? props.$fontColor
        : props.$bgColor
      : props.$fontColor};
  font-weight: bold;
`

const BtnWrap = styled(motion.span)<{ $typeBorder: boolean }>`
  position: absolute;
  border-radius: 50%;
  background-color: ${props =>
    props.$typeBorder ? 'rgba(0, 125, 233, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
`
export default function CustomRippleButton(props: CustomRippleButtonProps) {
  const {
    buttonType,
    width,
    height,
    radius,
    bgColor = '#007de9',
    fontColor,
    fontSize,
    typeBorder, // 이 부분을 추가
    bWidth,
    children,
    borderColor,
    onClick,
  } = props

  const [ripples, setRipples] = useState<Array<any>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const rippleSize = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - rippleSize / 2
    const y = e.clientY - rect.top - rippleSize / 2

    const newRipple = {
      id: Date.now(),
      size: rippleSize,
      x,
      y,
    }

    setRipples([...ripples, newRipple])

    if (onClick) {
      onClick()
    }
  }

  return (
    <>
      <Btn
        type={buttonType}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        $width={width}
        $height={height}
        $radius={radius}
        $bgColor={bgColor}
        $fontColor={fontColor}
        $fontSize={fontSize}
        $typeBorder={typeBorder}
        $bWidth={bWidth}
        $borderColor={borderColor}
      >
        {children}
        {ripples?.map(ripple => (
          <BtnWrap
            $typeBorder={typeBorder}
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </Btn>
    </>
  )
}
