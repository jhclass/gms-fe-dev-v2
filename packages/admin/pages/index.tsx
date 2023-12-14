import List from '@/components/common/List'
import NewConsultNum from '@/components/dashboard/NewConsultNum'
import ConsultNum from '@/components/dashboard/ConsultNum'
import MainWrap from '@/components/wrappers/MainWrap'
import Layout from '@/components/wrappers/MainWrap'
import { navOpenState } from '@/lib/recoilAtoms'
import { AnimatePresence, Reorder, motion } from 'framer-motion'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

const Wrap = styled(motion.div)<{ $navOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: ${props => (props.$navOpen ? '4rem 0 0 18rem;' : '4rem 0 0 5rem;')};
  background-color: #d6e4f1;

  @media screen and (max-width: 1024px) {
    padding: 4rem 0 0 0;
  }
`
const HomeArea = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`
const FirstArea = styled.div``
const SecondArea = styled.div``
const ThirdArea = styled.div``
const FourthArea = styled.div``

const DragBox = styled.div`
  position: relative;
  width: 300px;
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 24px;
`
const ItemBox = styled.div`
  border-radius: 10px;
  margin-bottom: 10px;
  width: 100%;
  padding: 15px 18px;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  cursor: grab;
`
const initialItems = ['🍅 Tomato', '🥒 Cucumber', '🧀 Cheese', '🥬 Lettuce']
export default function Home() {
  const [items, setItems] = useState(initialItems)
  return (
    <>
      <Layout>
        <HomeArea>
          <div>
            <NewConsultNum />
          </div>
          <div>
            <ConsultNum />
          </div>
          <div>
            <DragBox>
              <AnimatePresence initial={true}>
                <Reorder.Group axis="y" values={items} onReorder={setItems}>
                  {items.map((item, index) => (
                    // <List key={index} item={item} />
                    <Reorder.Item key={item} value={item}>
                      <ItemBox>{item}</ItemBox>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </AnimatePresence>
            </DragBox>
          </div>
        </HomeArea>
      </Layout>
    </>
  )
}
