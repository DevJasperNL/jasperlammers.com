// Refreshes src/data/github-numbers.json: star counts of the repos in src/data/record.yaml and the merged
// NetDaemon pull requests. Run monthly by .github/workflows/update-github-numbers.yml, or by hand:
//   npm run update-github-numbers
// GITHUB_TOKEN is optional; without it GitHub allows 60 calls an hour per IP.
import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const NETDAEMON_QUERY = 'repo:net-daemon/netdaemon is:pr is:merged author:DevJasperNL';

const record = await readFile(new URL('src/data/record.yaml', root), 'utf8');
const repos = [...record.matchAll(/^\s*repo:\s*(\S+)\s*$/gm)].map((m) => m[1]);

async function api(path) {
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'jasperlammers.com update-github-numbers',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`GET ${path}: ${response.status} ${response.statusText}`);
  return response.json();
}

const stars = {};
for (const repo of repos) stars[repo] = (await api(`/repos/${repo}`)).stargazers_count;
const search = await api(`/search/issues?per_page=1&q=${encodeURIComponent(NETDAEMON_QUERY)}`);

const numbers = { date: new Date().toISOString().slice(0, 10), stars, netDaemonMergedPrs: search.total_count };
await writeFile(new URL('src/data/github-numbers.json', root), `${JSON.stringify(numbers, null, 2)}\n`);
console.log(JSON.stringify(numbers, null, 2));
