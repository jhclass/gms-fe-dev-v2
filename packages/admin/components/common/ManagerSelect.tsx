import { Select, SelectItem } from '@nextui-org/react'

export default function managerSelect({
  studentState = null,
  manager,
  field,
  handleManagerChange,
  managerList,
  grade,
}) {
  return (
    <>
      <Select
        labelPlacement="outside"
        label="담당자"
        placeholder=" "
        className="w-full"
        defaultValue={studentState ? studentState.pic : null}
        variant="bordered"
        selectedKeys={[manager]}
        onChange={value => {
          if (value.target.value !== '') {
            field.onChange(value)
            handleManagerChange(value)
          }
        }}
      >
        {[
          {
            mUsername: '담당자 지정필요',
            mUserId: '담당자 지정필요',
          },
          ...managerList?.filter(
            manager =>
              manager.mGrade === grade.master ||
              manager.mPart.includes('영업팀'),
          ),
        ].map(item => (
          <SelectItem key={item.mUsername} value={item.mUsername}>
            {item.mUsername}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
