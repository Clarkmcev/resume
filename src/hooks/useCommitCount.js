import { useEffect, useState } from "react";

const COMMITS_URL =
  "https://api.github.com/repos/Clarkmcev/resume/commits?sha=main&per_page=1";

// With per_page=1, the page number of the "last" link equals the commit count.
const parseLastPage = (linkHeader) =>
  linkHeader?.match(/[?&]page=(\d+)>; rel="last"/)?.[1] ?? null;

function useCommitCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(COMMITS_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub API ${response.status}`);
        setCount(parseLastPage(response.headers.get("link")));
      })
      .catch((error) => {
        if (error.name !== "AbortError") setCount(null);
      });

    return () => controller.abort();
  }, []);

  return count;
}

export default useCommitCount;
