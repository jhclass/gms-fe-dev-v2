import Form from '@/components/Form'
import Head from 'next/head'

export default function academy() {
  return (
    <>
      <Head>
        <title>HART | 아카데미소개</title>
        <meta name="description" content="아카데미소개" />
      </Head>
      <section className="bg-[#f9f9f9]">
        <div className="max-w-[1440px] mx-auto my-0">
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/academy_intro.webp"
            alt="당신의 잠재력을 현실로 만드세요 트렌드를 바탕으로 디자이너와 프로그레머의 비전을 향해 에이치아카데미가 함께합니다.
            @CREATIVE & IDEATION & PROCESS 여러분의 창의력과 상상을 구현하기 위해 아이데이션을 말하고, 표현으로 완성하는 프로세스를 교육합니다. 에이치아카데미의 교육은 수강생의 잠재력을 발견합니다. 그 발견을 위해 수강생과의 소통을 노력하고, 트렌디한 시각으로 눈높이를 맞추며 관계를 이어갑니다. 
            에이치아카데미는 잠재력을 발견하여 진정성 있는 디자이너/프로그래머로 거듭나는 미래를 제공합니다. 결국 이와 같은 노력은 머리 속 상상을 타인에게 전달하고 표현할 수 있는 시발점이 되어, 한명의 디자이너/프로그래머로서 탄생하게됩니다. 
            취업을 희망하는 예비 디자이너/프로그래머 모두에게 실무를 체험하고 경험케합니다. 에이치아카데미는 디자이너/프로그래머를 양성하는 전문 교육기관이 되기 위해 노력하고 있습니다. 때문에 교육을 담당하는 강사진은 필드에 있는 현업 작가/디자이너/프로그래머 중심의 실무진으로 구성되어 있습니다.
            "
            className="hidden w-full wmd:block"
          ></img>
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/academy_intro.webp"
            alt="당신의 잠재력을 현실로 만드세요 트렌드를 바탕으로 디자이너와 프로그레머의 비전을 향해 에이치아카데미가 함께합니다.
            @CREATIVE & IDEATION & PROCESS 여러분의 창의력과 상상을 구현하기 위해 아이데이션을 말하고, 표현으로 완성하는 프로세스를 교육합니다. 에이치아카데미의 교육은 수강생의 잠재력을 발견합니다. 그 발견을 위해 수강생과의 소통을 노력하고, 트렌디한 시각으로 눈높이를 맞추며 관계를 이어갑니다. 
            에이치아카데미는 잠재력을 발견하여 진정성 있는 디자이너/프로그래머로 거듭나는 미래를 제공합니다. 결국 이와 같은 노력은 머리 속 상상을 타인에게 전달하고 표현할 수 있는 시발점이 되어, 한명의 디자이너/프로그래머로서 탄생하게됩니다. 
            취업을 희망하는 예비 디자이너/프로그래머 모두에게 실무를 체험하고 경험케합니다. 에이치아카데미는 디자이너/프로그래머를 양성하는 전문 교육기관이 되기 위해 노력하고 있습니다. 때문에 교육을 담당하는 강사진은 필드에 있는 현업 작가/디자이너/프로그래머 중심의 실무진으로 구성되어 있습니다.
            "
            className="block w-full wmd:hidden"
          ></img>
        </div>
      </section>
      <section className="pb-[6rem]">
        <Form />
      </section>
    </>
  )
}
