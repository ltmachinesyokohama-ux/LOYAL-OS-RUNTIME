
import fs from 'node:fs';
import path from 'node:path';

const OWNER = 'ltmachinesyokohama-ux';
const TOKEN = process.env.GITHUB_TOKEN || '';
const HEADERS = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {})
};

async function api(url, optional = false) {
  const response = await fetch(url, { headers: HEADERS });
  if (optional && response.status === 404) return null;
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response.json();
}

const cleanPath = s =>
  typeof s === 'string' &&
  s.startsWith('/') &&
  !s.includes('..') &&
  s.length < 250;

const modules = [];

for (let page = 1; ; page++) {
  const repos = await api(
    `https://api.github.com/users/${OWNER}/repos?type=owner&per_page=100&page=${page}`
  );
  if (!repos.length) break;

  for (const repo of repos) {
    if (
      repo.private ||
      repo.archived ||
      repo.disabled ||
      repo.name === 'LOYAL-OS-RUNTIME'
    ) continue;

    const root =
      `https://api.github.com/repos/${OWNER}/${encodeURIComponent(repo.name)}`;

    const branch = encodeURIComponent(repo.default_branch);

    const entry = await api(
      `${root}/contents/loyal-auto.js?ref=${branch}`,
      true
    );

    if (!entry || entry.type !== 'file') continue;

    const settings = await api(
      `${root}/contents/loyal-module.json?ref=${branch}`,
      true
    );

    let paths = ['*'];

    if (settings && settings.type === 'file') {
      const conf = JSON.parse(
        Buffer.from(settings.content, 'base64').toString('utf8')
      );

      if (conf.enabled === false) continue;

      if (
        !Array.isArray(conf.paths) ||
        !conf.paths.every(x => x === '*' || cleanPath(x))
      ) {
        throw new Error(`Invalid module paths: ${repo.name}`);
      }

      paths = conf.paths;
    }

    const commit = await api(`${root}/commits/${branch}`);
    const sha = commit.sha;

    if (!/^[a-f0-9]{40}$/.test(sha)) {
      throw new Error(`Invalid SHA: ${repo.name}`);
    }

    modules.push({
      name: repo.name,
      paths,
      src:
        `https://cdn.jsdelivr.net/gh/${OWNER}/${repo.name}@${sha}/loyal-auto.js`
    });
  }

  if (repos.length < 100) break;
}

modules.sort((a, b) => a.name.localeCompare(b.name));

const dest = 'autoloader/modules.json';

const old = fs.existsSync(dest)
  ? JSON.parse(fs.readFileSync(dest, 'utf8'))
  : null;

if (
  old &&
  JSON.stringify(old.modules) === JSON.stringify(modules)
) {
  console.log(`Unchanged: ${modules.length} modules`);
} else {
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  fs.writeFileSync(
    dest,
    JSON.stringify({ version: 1, modules }, null, 2) + '\n'
  );

  console.log(`Registry updated: ${modules.length} modules`);
}
