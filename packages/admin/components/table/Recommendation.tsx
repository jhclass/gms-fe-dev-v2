import RecommendationForm from '@/components/form/RecommendationForm'
import RecommendationList from '@/components/form/RecommendationList'

export default function Recommendation({ paymentId, subjectId }) {
  return (
    <>
      <RecommendationForm paymentId={paymentId} subjectId={subjectId} />
      <RecommendationList />
    </>
  )
}
