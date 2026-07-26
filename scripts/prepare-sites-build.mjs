import { cp, mkdir, writeFile } from 'node:fs/promises';

const projectRoot = new URL('../', import.meta.url);
const serverDirectory = new URL('../dist/server/', import.meta.url);
const hostingDirectory = new URL('../dist/.openai/', import.meta.url);

const worker = `const worker = {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || request.method !== 'GET') return response;

    const url = new URL(request.url);
    if (url.pathname.includes('.')) return response;

    return env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
  },
};

export default worker;
`;

await mkdir(serverDirectory, { recursive: true });
await mkdir(hostingDirectory, { recursive: true });
await writeFile(new URL('index.js', serverDirectory), worker, 'utf8');
await cp(
  new URL('.openai/hosting.json', projectRoot),
  new URL('hosting.json', hostingDirectory),
);
