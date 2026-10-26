import LayoutA from './a/LayoutA.astro';
import HomeA from './a/HomeA.astro';
import EssayA from './a/EssayA.astro';
import RecordA from './a/RecordA.astro';
import LayoutB from './b/LayoutB.astro';
import HomeB from './b/HomeB.astro';
import EssayB from './b/EssayB.astro';
import RecordB from './b/RecordB.astro';
import LayoutC from './c/LayoutC.astro';
import HomeC from './c/HomeC.astro';
import EssayC from './c/EssayC.astro';
import RecordC from './c/RecordC.astro';
import { DIRECTIONS } from './directions';

export const COMPONENTS = {
  a: { Layout: LayoutA, Home: HomeA, Essay: EssayA, Record: RecordA },
  b: { Layout: LayoutB, Home: HomeB, Essay: EssayB, Record: RecordB },
  c: { Layout: LayoutC, Home: HomeC, Essay: EssayC, Record: RecordC },
};

export const directionPaths = () => DIRECTIONS.map((d) => ({ params: { dir: d.id }, props: { direction: d } }));
