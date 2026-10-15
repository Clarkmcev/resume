import Bats from "./Bats";
import Dust from "./Dust";
import Fireflies from "./Fireflies";
import Fog from "./Fog";
import Petals from "./Petals";
import Snow from "./Snow";
import Steam from "./Steam";
import Sun from "./Sun";
import Synthwave from "./Synthwave";
import Waves from "./Waves";

// Background scene for each theme id in src/themes.js
const scenes = {
  dark: Waves,
  light: Fog,
  nord: Snow,
  dracula: Bats,
  gruvbox: Steam,
  solarized: Sun,
  forest: Fireflies,
  rose: Petals,
  synthwave: Synthwave,
  sepia: Dust,
};

export default scenes;
