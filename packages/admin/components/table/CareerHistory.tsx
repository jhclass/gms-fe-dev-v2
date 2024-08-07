import CareerHistoryForm from '@/components/form/CareerHistoryForm'
import CareerHistoryList from '@/components/form/CareerHistoryList'

export default function CareerHistory({ paymentId, subjectId }) {
  return (
    <>
      <CareerHistoryForm paymentId={paymentId} subjectId={subjectId} />
      <CareerHistoryList />
    </>
  )
}
