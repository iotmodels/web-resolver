import { dtmiToPath } from './repo-convention-browser.js'

const getDependencies = rootJson => {
  const deps = []
  if (rootJson.extends) {
    if (Array.isArray(rootJson.extends)) {
      rootJson.extends.forEach(e => deps.push(e))
    } else {
      deps.push(rootJson.extends)
    }
  }
  if (rootJson.contents) {
    const comps = rootJson.contents.filter(c => c['@type'] === 'Component')
    comps.forEach(c => {
      if (typeof c.schema !== 'object') {
        if (deps.indexOf(c.schema) === -1) {
          deps.push(c.schema)
        }
      }
    })
  }
  return deps
}

export const expand = async (dtmi, repos) => {
  const knownIds = {}
  const rootAndDeps = []

  const fetchFromRepo = async (repoBaseUrl, dtmi) => {
    try {
      const path = dtmiToPath(dtmi)
      console.log(`GET: ${repoBaseUrl}${path}`)
      const doc = await (await window.fetch(`${repoBaseUrl}${path}`)).json()
      rootAndDeps.push(doc)
      knownIds[dtmi] = `${repoBaseUrl}${path}`
      return true
    } catch {}
  }

  const walkRepos = async (repos, dtmi) => {
    let found = false
    for (let i = 0; i < repos.length; i++) {
      const r = repos[i]
      if (r) {
        found = await fetchFromRepo(r, dtmi)
        if (found) break
      }
    }
    return found
  }

  const walkDeps = async (dtmi, repos) => {
    const found = await walkRepos(repos, dtmi)
    if (found) {
      const doc = rootAndDeps.filter(d => d['@id'] === dtmi)[0]
      const deps = getDependencies(doc)
      for await (const d of deps) {
        if (!knownIds[d]) {
          await walkDeps(d, repos)
        }
      }
    } else {
      console.log(`DTMI ${dtmi} not found in repo list`)
    }
  }
  await walkDeps(dtmi, repos)
  return { rootAndDeps, knownIds }
}
