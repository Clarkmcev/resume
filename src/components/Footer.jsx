import useCommitCount from "../hooks/useCommitCount";

function Footer() {
  const commitCount = useCommitCount();

  return (
    <footer className="text-third text-center text-sm w-full p-4 italic font-thin border-t border-second">
      <div>Developed & designed by Clark McEvoy</div>
      {commitCount && <div>Number of commits {commitCount}</div>}
    </footer>
  );
}

export default Footer;
