import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { activeCategoryState } from '@/lib/recoilAtoms'
import CategoryItem from './CategoryItem';
import styled from 'styled-components';


const CateWrap = styled(motion.ul)`

`

export default function Category() {
  const [activeCategory, setActiveCategory] = useRecoilState(activeCategoryState);

  const categories = [
    { href: '/', iconSrc: '/src/icon/ico_home.png', alt: '홈', label: '홈' },
    { href: '/', iconSrc: '/src/icon/ico_consult.png', alt: '상담관리', label: '상담관리' },
    { href: '/', iconSrc: '/src/icon/ico_work.png', alt: '업무관리', label: '업무관리' },
  ];
  

  return (
    <>
      <CateWrap>
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            href={category.href}
            iconSrc={category.iconSrc}
            alt={category.alt}
            label={category.label}
            isActive={activeCategory === index}
            onClick={() => setActiveCategory(index)}
          />
        ))}
      </CateWrap>
    </>
  )
}
