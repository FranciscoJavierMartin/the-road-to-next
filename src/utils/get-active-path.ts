import { closest } from 'fastest-levenshtein';

export default function getActivePath(
  path: string,
  paths: string[],
  ignorePaths?: string[],
): { activeIndex: number; activePath: string } {
  const closestPath = closest(path, paths.concat(ignorePaths || []));
  const index = paths.indexOf(closestPath);

  return { activeIndex: index, activePath: closestPath };
}
