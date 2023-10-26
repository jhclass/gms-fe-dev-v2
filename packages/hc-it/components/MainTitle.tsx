interface TitleProps {
  title: string;
  subs?: string;
  flag?: string;
  colorWhite?: boolean;
}

export default function Countdown({title, subs, flag, colorWhite}:TitleProps) {
  return (
    <>
      {
        flag ? (
          <span className="px-2 py-1 font-light text-center text-white rounded-r-lg rounded-tl-lg text-xs/xs bg-primary">{flag}</span>
        ) : null
      }
      <h2 className={`mt-2 text-3xl font-bold ${colorWhite ? `text-white` :'text-black' }`}>{title}</h2>
      <p className={`mt-2 text-l ${colorWhite ? `text-zinc-300` :'text-zinc-600' }`}>{subs}</p>
    </>
  );
}
