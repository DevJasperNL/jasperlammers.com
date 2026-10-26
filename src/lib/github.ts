import snapshot from '../data/github-snapshot.json';

export interface GitHubNumbers {
  stars: Record<string, number>;
  netDaemonMergedPrs: number;
  /** Set when the API failed and the numbers come from the committed snapshot. */
  snapshotDate?: string;
}

const NETDAEMON_QUERY = 'repo:net-daemon/netdaemon is:pr is:merged author:DevJasperNL';

async function api<T>(path: string): Promise<T> {
  // GITHUB_TOKEN is optional; without it the build shares the unauthenticated limit (60 calls an hour per IP).
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'jasperlammers.com build',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`GET ${path}: ${response.status} ${response.statusText}`);
  return (await response.json()) as T;
}

async function fetchNumbers(repos: string[]): Promise<GitHubNumbers> {
  const [stars, search] = await Promise.all([
    Promise.all(repos.map((repo) => api<{ stargazers_count: number }>(`/repos/${repo}`))),
    api<{ total_count: number }>(`/search/issues?per_page=1&q=${encodeURIComponent(NETDAEMON_QUERY)}`),
  ]);
  return {
    stars: Object.fromEntries(repos.map((repo, i) => [repo, stars[i].stargazers_count])),
    netDaemonMergedPrs: search.total_count,
  };
}

let numbers: Promise<GitHubNumbers> | undefined;

/**
 * Star counts and the merged NetDaemon pull requests, fetched once per build.
 * A failed call never breaks the build: it falls back to the dated snapshot, which can only understate
 * (stars and merged PRs rarely go down), and logs a warning in the build output.
 */
export function getGitHubNumbers(repos: string[]): Promise<GitHubNumbers> {
  numbers ??= fetchNumbers(repos).catch((error: unknown) => {
    console.warn(`[record] GitHub API failed, using the snapshot of ${snapshot.date}: ${String(error)}`);
    return { ...snapshot, snapshotDate: snapshot.date };
  });
  return numbers;
}
