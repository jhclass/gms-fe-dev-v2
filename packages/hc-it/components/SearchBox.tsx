import { Input } from "@nextui-org/react";

export default function SearchBox() {
  const handleSearch = () => {
    alert(`준비중입니다. 😊`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="hidden lg:block lg:w-[20rem]">
        <Input
          classNames={{
            base: "max-w-full h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          fullWidth
          placeholder="검색어를 입력해주세요"
          size="sm"
          startContent={<i className="xi-search"/>}
          type="search"
          onKeyDown={handleKeyPress}
        />
      </div>
    </>
  );
}