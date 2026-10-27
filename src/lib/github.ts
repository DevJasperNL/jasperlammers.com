import numbers from '../data/github-numbers.json';

export interface GitHubNumbers {
  stars: Record<string, number>;
  netDaemonMergedPrs: number;
}

/**
 * Star counts and the merged NetDaemon pull requests, as committed in src/data/github-numbers.json.
 * The build makes no network calls; the numbers are refreshed monthly by a workflow that commits the file.
 */
export function getGitHubNumbers(repos: string[]): GitHubNumbers {
  const stars: Record<string, number> = numbers.stars;
  const missing = repos.filter((repo) => !(repo in stars));
  if (missing.length) {
    throw new Error(`No GitHub numbers for ${missing.join(', ')}. Run: npm run update-github-numbers`);
  }
  return { stars, netDaemonMergedPrs: numbers.netDaemonMergedPrs };
}
