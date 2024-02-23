import MainTitle from '@/components/MainTitle'
import RankingCard from '@/components/RankingCard'
import ListLayout from '@/components/layout/ListLayout'
import { styled } from 'styled-components'
import Curriculum01 from '../section/Curriculum01'
import CurriculumItem from '../items/CurriculumItem'

const Title = styled.div``
const List = styled.div`
  padding: 0.8rem;
`

const Wrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`

export default function CurriculumItems() {
  const list = [
    {
      category: '웹툰 / WEBTOON',
      writer: '이○○ [ 웹툰 / 김*석 강사 ] 2024. 02. 04',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_revi_01.png',
      con: '인체 비율 등 기본기를 배우고 싶었는데 도움이 많이 되었습니다 완전 쌩 초보라서 걱정했는데 강사 선생님이꼼꼼하게 기초부처 설명 해주셔서 도움 많이 되었습니다. 강의 내용이 매우 유익 하면서 재미있었습니다.',
      link: '/detail/webtoon',
    },
    {
      category: '모션그래픽 / MOTION GRAPHIC',
      writer: '박○○ [ 웹툰 / 이*지 강사 ] 2024. 02. 04',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_revi_02.png',
      con: '전부터 애프터이펙트와 프리미어프로를 배우고 싶었습니다. 동시에 두과목을 배우고 바로 적용할 수 있어서 매우 만족합니다. 결과물 나올때까지 강사님의 열정적인 모습이 인상 깊었습니다. 이런 수업과정은 처음 접하신분들에게 추천드리고 싶습니다. 매우 만족합니다 ^^',
      link: '/detail/webtoon',
    },
    {
      category: '시각디자인 / DESIGN',
      writer: '황○○ [ 포토샵 / 이*지 강사 ] 2024. 02. 04',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_revi_03.png',
      con: '이제까지 짧은교육을 여러장소에서  10~13강의정도 들었지만, 이렇게 목소리 크게 전달력 좋은 선생님은 처음이였습니다! 교재보다 선생님이 준비해온 보조자료가 너무 좋았으며, 포토샵을 한번도 해본적이 없는데 너무 유익했습니다.',
      link: '/detail/webtoon',
    },
    {
      category: '모션그래픽 / MOTION GRAPHIC',
      writer: '조○○ [ 영상편집 / 이*지 강사 ] 2024. 02. 04',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_revi_04.png',
      con: '처음에는 포토샵, 일러스트 등 이러한 프로그램을 아예 다뤄보지 못했고 많이 어려울거라고 걱정을 했었지만, 이 과정을 수료하면서 전반적으로 주위에서 보이는 광고들이 어떤 특수효과들이 눈에 보이기 시작하면서 디자인 툴 활용도 상승에 큰 도움이 되었습니다.',
      link: '/detail/webtoon',
    },
    {
      category: '모션그래픽 / MOTION GRAPHIC',
      writer: '이○○ [ C4D/ 이*지 강사 ] 2024. 02. 04',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_revi_05.png',
      con: '정말 많은걸 배웠습니다. 기본적인 툴과 사용법들을 배워 많은것을 얻어가서 너무 좋은 기회였습니다. 정말 잘배웠다고 생각합니다 또한 선생님 께서 하나하나 다 알려주셨고 너무 감사했습니다.',
      link: '/detail/webtoon',
    },
  ]
  return (
    <Wrap>
      <List>
        <ListLayout>
          {list.map((item, index) => (
            <CurriculumItem key={index} itemData={item}></CurriculumItem>
          ))}
        </ListLayout>
      </List>
    </Wrap>
  )
}
