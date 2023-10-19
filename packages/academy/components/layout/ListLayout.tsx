export default function ListLayout({children}) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5 xl:gap-8">
          {children}
        </div>
      </>
    );
  }