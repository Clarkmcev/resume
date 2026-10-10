function SectionHeading({ number, children }) {
  return (
    <h1>
      <span className="number mr-4">{number}.</span>
      {children}
    </h1>
  );
}

export default SectionHeading;
