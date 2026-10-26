import LayoutA from './a/LayoutA.astro';
import HomeA from './a/HomeA.astro';
import EssayA from './a/EssayA.astro';
import RecordA from './a/RecordA.astro';
import { DIRECTIONS } from './directions';

// B and C are archived in archive/design-directions/ (tag design-directions-v1).
export const COMPONENTS = {
  a: { Layout: LayoutA, Home: HomeA, Essay: EssayA, Record: RecordA },
};

export const directionPaths = () => DIRECTIONS.map((d) => ({ params: { dir: d.id }, props: { direction: d } }));
