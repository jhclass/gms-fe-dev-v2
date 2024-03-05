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
`

const Wrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`

export default function CurriculumItems() {
  const list = [
    {
      category: '모션그래픽 / MOTION GRAPHIC',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_curr_01.png',
      mimg: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_curr_01.png',
      desc: '모션그래픽의 컨셉을 설정하고 그에 따른 프레임 연출과 이펙트 표현 등, 영상컨셉에 맞는 편집과 제작방법을 교육합니다.',
      link: '/detail/webtoon',
    },
    {
      category: '시각디자인 / 포토샵, 일러스트, 디자인자격증',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_curr_02.png',
      mimg: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_curr_02.png',
      desc: '포토샵의 전문적인 보정 및 합성 방식. 그리고 일러스트레이션의 극대화를 통해 심플한 디자인과 3D에 버금가는 소스 제작.',
      link: '/detail/emoticon',
    },
    {
      category: '웹툰 / WEBTOON, EMOTICON',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_curr_03.png',
      mimg: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_curr_03.png',
      desc: '웹툰작가에게 배우는 WEBTOON!! 드로잉의 이해부터 단편웹툰 제작까지! 최고의 강사진이 웹툰의 모든것을 알려드립니다',
      link: '/detail/motion',
    },
    {
      category: '디지털 드로잉 / DIGITAL DRAWING',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_curr_04.png',
      mimg: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_curr_04.png',
      desc: '디지털 일러스트레이션의 다양한 완성, 분야별 컨셉파악부터 스토리에 따른 개인별 작품완성까지!!',
      link: '/detail/emoticon',
    },
    {
      category: '프로그래밍 (IT) / 국비지원수업, 일본해외취업',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_curr_05.png',
      mimg: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_curr_05.png',
      desc: 'IT전반에서 사용되는 프로그래밍 언어와 스킬에 대해 공부하고, 실무에서 직접 사용되는 기술을 교육합니다.',
      link: '/detail/motion',
    },
    {
      category: '일본해외취업과정 (IT부분)',
      mimg: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_curr_06.png',
      desc: '「IT」전반에서 사용되는 프로그래밍 언어와 스킬에 대해 공부하고, 일본어를 공부하여 일본IT 실무 회사 채용확정을 목표합니다.',
      link: '/detail/motion',
    },
  ]
  return (
    <div className="wrap">
      <List>
        <div className="grid grid-cols-1 gap-20 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5 xl:gap-8">
          {list.map((item, index) => (
            <CurriculumItem key={index} itemData={item}></CurriculumItem>
          ))}
        </div>
      </List>
    </div>
  )
}
