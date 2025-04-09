type RowProps = {
  children: React.ReactNode;
};

const Row = ({ children }: RowProps) => {
  return <div className="flex gap-3 mb-2 ">{children}</div>;
};

export default Row;

// type RowProps = {
//   children: React.ReactNode;
// };

// const Row = ({ children }: RowProps) => {
//   return <div className="grid grid-cols-4 gap-3 mb-2">{children}</div>;
// };

// export default Row;
