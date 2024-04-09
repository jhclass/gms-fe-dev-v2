import MainTitle from '@/components/MainTitle'
import RankingCard from '@/components/RankingCard'
import ListLayout from '@/components/layout/ListLayout'
import { styled } from 'styled-components'
import Curriculum01 from '../section/Curriculum01'
import CurriculumItem from '../items/CurriculumItem'

const Title = styled.div``
const List = styled.div`
  padding: 0.8rem;
  background: #fff;

  > div {
  }
`

const Wrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`
const ListCon = styled.div`
  position: relative;
`
const Deco = styled.div`
  position: absolute;
  bottom: 10%;
  transform: translateX(-50%);
  right: -50%;
  width: 20%;
  flex: 0;
`

export default function CurriculumItems() {
  const list = [
    {
      category: '모션그래픽 / MOTION GRAPHIC',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_curr_01.webp',
      mimg: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_curr_01.webp',
      desc: '모션그래픽의 컨셉을 설정하고 그에 따른 프레임 연출과 이펙트 표현 등, 영상컨셉에 맞는 편집과 제작방법을 교육합니다.',
      link: '/detail/webtoon',
    },
    {
      category: '시각디자인 / 포토샵, 일러스트, 디자인자격증',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_curr_02.webp',
      mimg: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_curr_02.webp',
      desc: '포토샵의 전문적인 보정 및 합성 방식. 그리고 일러스트레이션의 극대화를 통해 심플한 디자인과 3D에 버금가는 소스 제작.',
      link: '/detail/emoticon',
    },
    {
      category: '웹툰 / WEBTOON, EMOTICON',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_curr_03.webp',
      mimg: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_curr_03.webp',
      desc: '웹툰작가에게 배우는 WEBTOON!! 드로잉의 이해부터 단편웹툰 제작까지! 최고의 강사진이 웹툰의 모든것을 알려드립니다',
      link: '/detail/motion',
    },
    {
      category: '디지털 드로잉 / DIGITAL DRAWING',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_curr_04.webp',
      mimg: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_curr_04.webp',
      desc: '디지털 일러스트레이션의 다양한 완성, 분야별 컨셉파악부터 스토리에 따른 개인별 작품완성까지!!',
      link: '/detail/emoticon',
    },
  ]
  return (
    <div className="wrap">
      <List>
        <div className="grid grid-cols-1 gap-20 md:gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:grid-cols-4 xl:gap-40">
          {list.map((item, index) => (
            <ListCon key={index}>
              <CurriculumItem itemData={item}></CurriculumItem>
              {index !== 3 && (
                <Deco className="hidden xl:block">
                  <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/H_simbol_color.png" />
                </Deco>
              )}
            </ListCon>
          ))}
        </div>
      </List>
    </div>
  )
}
