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

// Palette values live in src/App.css under [data-theme="<id>"]
const themes = [
  { id: "dark", label: "Ocean", dark: true, Icon: GiWaveCrest },
  { id: "light", label: "Mist", dark: false, Icon: BsCloudFog2Fill },
  { id: "nord", label: "Nord", dark: true, Icon: BsSnow2 },
  { id: "dracula", label: "Dracula", dark: true, Icon: GiBat },
  { id: "gruvbox", label: "Gruvbox", dark: true, Icon: GiCoffeeCup },
  { id: "solarized", label: "Solarized", dark: false, Icon: BsSunFill },
  { id: "forest", label: "Forest", dark: true, Icon: GiPineTree },
  { id: "rose", label: "Rosé", dark: false, Icon: GiRose },
  { id: "synthwave", label: "Synthwave", dark: true, Icon: GiSunset },
  { id: "sepia", label: "Sepia", dark: false, Icon: GiScrollUnfurled },
];

export const isTheme = (id) => themes.some((theme) => theme.id === id);

export default themes;
