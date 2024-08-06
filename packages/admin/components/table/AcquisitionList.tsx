import AcquisitionForm from '@/components/form/AcquisitionForm'
import AcquisitionList from '@/components/form/AcquisitionList'

export default function Acquisition({ paymentId, subjectId }) {
  return (
    <>
      <AcquisitionForm paymentId={paymentId} subjectId={subjectId} />
      <AcquisitionList />
    </>
  )
}
