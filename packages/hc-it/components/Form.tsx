import { Button, Checkbox, CheckboxGroup, Input, ScrollShadow, Tab, Tabs, Textarea } from "@nextui-org/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  groupSelected: string[];
  name: string;
  phone: string;
  content: string;
  privacy: boolean;
}

export default function Form() {
  const [groupSelected, setGroupSelected] = React.useState([]);
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();
  const onSubmit = (data: FormValues) => console.log(data);
  const handleCheckboxChange = (value: string[]) => {
    setValue('groupSelected', value);
    setGroupSelected(value);
  };
  return (
      <>
        <div className="wrap">
          <h2 className="pb-3 mb-5 text-3xl font-bold border-b-2 border-zinc-600">온라인 상담</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex">
            <div className="w-1/3 mr-10">
              <div className="w-full h-full bg-primary"></div>
            </div>
            <div className="flex flex-col w-1/3 mr-10">
              <p className="mb-3 text-zinc-600">원하시는 과정을 선택해주세요. 교육과정은 중복 선택이 가능합니다.</p>
              <Tabs 
                aria-label="Options"
                color="primary" 
                className="w-full"         
              >
                <Tab key="IT" title="IT">
                  <div className="w-full border-2 rounded-lg p-7">
                    <Controller
                      control={control}
                      name="groupSelected"
                      render={({ field }) => (
                        <CheckboxGroup
                          value={groupSelected}
                          onValueChange={handleCheckboxChange}
                        >
                          <h4 className="text-base text-primary">커리어패스</h4>
                          <Checkbox size="md" value="파이썬" name="ss"><span className="text-lg text-zinc-600">파이썬</span></Checkbox>
                          <Checkbox size="md" value="React"><span className="text-lg text-zinc-600">React</span></Checkbox>
                          <Checkbox size="md" value="자바"><span className="text-lg text-zinc-600">자바</span></Checkbox>
                          <h4 className="text-base mt-7 text-primary">국비지원</h4>
                          <Checkbox size="md" value="정보처리산업기사"><span className="text-lg text-zinc-600">정보처리산업기사</span></Checkbox>
                          <Checkbox size="md" value="풀스택 웹개발"><span className="text-lg text-zinc-600">풀스택 웹개발</span></Checkbox>
                          <Checkbox size="md" value="앱개발"><span className="text-lg text-zinc-600">앱개발</span></Checkbox>
                          <Checkbox size="md" value="백엔드개발"><span className="text-lg text-zinc-600">백엔드개발</span></Checkbox>
                        </CheckboxGroup>
                      )}
                    />
                  </div>
                </Tab>
                <Tab key="music" title="Music">
                  
                </Tab>
              </Tabs>
            </div>  
            <div className="w-1/3">
              <ul className="flex flex-wrap mb-2">
                {groupSelected.map((item, index) => (
                  <li key={index} className="flex items-center px-2 mx-1 my-1 rounded-lg text-sm/sm border-1 border-primary">
                    <span>{item}</span>
                    <button className="text-lg text-center text-primary"><i className="xi-close-min" /></button>
                  </li>
                ))}
              </ul>
              <ul>
                <li className="py-2">
                  <Input
                    isClearable
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="이름"
                    className="w-full"
                    {...register("name", { required: true })}
                    onClear={() => console.log("input cleared")}
                  />
                </li>
                <li className="py-2">
                  <Input
                    isClearable
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="휴대폰 번호"
                    className="w-full"
                    {...register("phone", { required: true })}
                    onClear={() => console.log("input cleared")}
                  />
                </li>
                <li className="py-2">
                  <p>상담 내용</p>
                  <Textarea
                    variant="bordered"
                    placeholder="상담을 원하시는 과목과 내용을 포함하여 최대한 상세하게 적어주시면 상담에 큰 도움이 됩니다."
                    {...register("content", { required: true })}
                    className="w-full"
                  />
                </li>
              </ul>
              <div>
                <p>개인정보처리방침</p>
                <div className="mt-3 border-2 rounded-lg">
                  <ScrollShadow className="w-full h-60">
                    <p className="p-3 text-sm text-zinc-600">
                      HighClass가 운영하는 웹&amp;모바일 사이트에 대하여 상담 및 이용자가 원하는 서비스를 충족시키기 위해 아래와 같은 개인정보를 수집하고 있습니다.<br/>
                      <br/>
                      <b>1. 수집하는 개인정보 항목 및 수집방법</b><br/>
                      (1) 수집항목<br/>
                      필수: 캠퍼스, 상담과목, 이름, 전화번호<br/>
                      선택입력: 아이디, 생년월일, 성별, 제목, 내용, 사진 등<br/>
                      (2) 개인정보 수집 방법 : 웹&모바일 홈페이지(온라인상담신청, 수강료조회, 내일배움카드제(계좌제)조회, 고용보험환급, 재직자국비과정조회, 시간표조회, 지점별 위치조회, 위탁교육문의 등), 서면양식 외<br/>
                      <br/>
                      <br/>
                      <b>2. 수집한 개인정보의 이용</b><br/>
                      (1) 이용자가 제공한 모든 정보는 교육 서비스 제공, 이벤트 안내 등 필요한 용도로만 사용되며, 목적이 변경될 시에는 사전에 동의를 구합니다.<br/>
                      <br/>
                      <br/>
                      <b>3. 개인정보의 보유 · 이용기간 및 폐기</b><br/>
                      모든 검토가 완료된 후 5년간 이용자의 조회를 위하여 보관하며, 이 후 해당정보를 지체없이 파기합니다.<br/>
                      <br/>
                      <br/>
                      <b>4. 동의를 거부할 권리가 있다는 사실과 동의 거부에 따른 불이익 내용</b><br/>
                      이용자는 HighClass가 운영하는 컴퓨터학원 및 계열 브랜드 웹&모바일 사이트에서 수집하는 개인정보에 대해 동의를 거부할 권리가 있으며 동의 거부 시에는 회원가입 및 인터넷 수강료 조회, 온라인 상담 등의 홈페이지 서비스가 일부 제한됩니다.<br/>
                      <br/>
                      그 밖의 사항은 <b>&lt;개인정보 처리방침&gt;</b>을 준수합니다.
                    </p>
                  </ScrollShadow>
                </div>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  name="privacy"
                  render={({ field }) => (
                    <Checkbox value={field.value} onChange={(e) => field.onChange(e.target.checked)} className="mt-2" size="md">개인정보수집 및 이용에 동의합니다.</Checkbox>
                  )}
                />
                {errors.privacy && <p className="text-sm text-red-600">개인정보수집 및 이용에 동의를 체크해주세요.</p>}

              </div>
              <Button type="submit"  size="lg" className="w-full mt-5 text-xl text-white rounded-lg bg-primary">
                온라인 상담 신청하기
              </Button> 
            </div>
          </form>
        </div>
      </>
    );
  };