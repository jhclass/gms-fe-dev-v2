import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { ripplesState } from '@/lib/recoilAtoms'

type CustomRippleButtonProps = {
  buttonType?: string;
  width?: string;
  radius?: string;
  bgColor?: string;
  fontColor?: string;
  fontSize?: string;
  typeBorder?: string;
  bWidth?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Btn = styled(motion.button)<{$width:string, $radius:string, $fontSize:string, $bgColor:string, $fontColor:string, $typeBorder:boolean, $bWidth:string}>`
  position: relative;
  margin-top: 3rem;
  width: ${props => props.$width || '100%'};
  min-height: 1.5rem;
  height: 3rem;
  padding: 0.375rem 0.75rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
  background-color: ${props => props.$bgColor || '#007de9'};
  overflow: hidden;
  font-size: ${props => props.$fontSize || '0.9rem'};
  border: ${props => props.$typeBorder ? `${props.$bWidth || '1px'} solid ${props.$bgColor}` : 'none'};
  border-radius: ${props => props.$radius || '0.75rem'};
  color: ${(props) => (props.$fontColor ? props.$fontColor : '#fff')};
  font-weight: bold;
`

const BtnWrap = styled(motion.span)`
  position: absolute;
  border-radius: 50%;
  background-color : rgba(255, 255, 255, 0.5);
`

export default function Button<CustomRippleButtonProps>({
  buttonType,
  width,
  radius,
  bgColor = '#007de9',
  fontColor,
  fontSize,
  typeBorder,
  bWidth,
  children,
  onClick,
}) {

  const [ripples, setRipples] = useRecoilState(ripplesState);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - rippleSize / 2;
    const y = e.clientY - rect.top - rippleSize / 2;

    const newRipple = {
      id: Date.now(),
      size: rippleSize,
      x,
      y,
    };

    setRipples([...ripples, newRipple]);

    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <Btn 
        whileTap={{ scale: 0.95 }}
        type={buttonType}
        onClick={handleClick}
        $width={width}
        $radius={radius}
        $bgColor={bgColor}
        $fontColor={fontColor}
        $fontSize={fontSize}
        $typeBorder={typeBorder}
        $bWidth={bWidth}
      >
        {children}
        {ripples.map((ripple) => (
          <BtnWrap
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
