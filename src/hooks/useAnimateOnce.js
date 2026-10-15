import { useEffect, useState } from "react";

// Pages whose entrance animation has already played. Lives outside React so
// it survives navigating away and back (it resets on a full page reload).
const played = new Set();

// Returns the value for framer-motion's `initial` prop: `hidden` on the first
// visit to a page, then `false`, which renders straight in the animated-to
// state without replaying the animation.
function useAnimateOnce(key, hidden = "hidden") {
  const [play] = useState(() => !played.has(key));
  useEffect(() => {
    played.add(key);
  }, [key]);
  return play ? hidden : false;
}

export default useAnimateOnce;
