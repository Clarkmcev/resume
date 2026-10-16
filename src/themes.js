import { BsCloudFog2Fill, BsSnow2, BsSunFill } from "react-icons/bs";
import {
  GiBat,
  GiCoffeeCup,
  GiPineTree,
  GiRose,
  GiScrollUnfurled,
  GiSunset,
  GiWaveCrest,
} from "react-icons/gi";

// Palette values live in src/App.css under [data-theme="<id>"].
// Themes with `unlockAt` open up once the runner game on the home page has
// been played to that score.
const themes = [
  { id: "dark", label: "Ocean", dark: true, Icon: GiWaveCrest },
  { id: "light", label: "Mist", dark: false, Icon: BsCloudFog2Fill },
  { id: "nord", label: "Nord", dark: true, Icon: BsSnow2 },
  { id: "dracula", label: "Dracula", dark: true, Icon: GiBat, unlockAt: 600 },
  {
    id: "gruvbox",
    label: "Gruvbox",
    dark: true,
    Icon: GiCoffeeCup,
    unlockAt: 150,
  },
  { id: "solarized", label: "Solarized", dark: false, Icon: BsSunFill },
  {
    id: "forest",
    label: "Forest",
    dark: true,
    Icon: GiPineTree,
    unlockAt: 300,
  },
  { id: "rose", label: "Rosé", dark: false, Icon: GiRose },
  {
    id: "synthwave",
    label: "Synthwave",
    dark: true,
    Icon: GiSunset,
    // the finish arch at bib 1074 (see src/components/runner/game.js)
    unlockAt: 1074,
    unlockHint: "Run all the way to the finish arch at bib 1074.",
  },
  { id: "sepia", label: "Sepia", dark: false, Icon: GiScrollUnfurled },
];

export const isTheme = (id) => themes.some((theme) => theme.id === id);

export const isUnlocked = (theme, bestScore) =>
  !theme.unlockAt || bestScore >= theme.unlockAt;

export const themeById = (id) => themes.find((theme) => theme.id === id);

// Themes that open up when a run goes from `before` to `after` points.
export const unlockedBetween = (before, after) =>
  themes.filter(
    (theme) =>
      theme.unlockAt && before < theme.unlockAt && after >= theme.unlockAt,
  );

export default themes;
