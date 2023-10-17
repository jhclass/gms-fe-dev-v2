export default function ListLayout({children}) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-8 sm:grid-cols-3 sm:gap-5">
          {children}
        </div>
      </>
    );
  }