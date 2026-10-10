import useCommitCount from "../hooks/useCommitCount";

function Footer() {
  const commitCount = useCommitCount();

  return (
    <footer className="fixed bottom-0 text-third text-center w-full p-2 bg-first italic font-thin border-t-2 border-second">
      <span className="hover:text-fourth cursor-pointer hover:-translate-y-10">
        Developed & designed by Clark McEvoy
      </span>
      {commitCount && <div>Number of commits {commitCount}</div>}
    </footer>
  );
}

export default Footer;
