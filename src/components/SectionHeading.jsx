// The section number is highlighted and jingles each time the section opens,
// matching its number in the navbar
function SectionHeading({ number, children }) {
  return (
    <h1>
      <span className="number number-active jingle mr-4">{number}.</span>
      {children}
    </h1>
  );
}

export default SectionHeading;
