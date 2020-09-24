import { dtmi2path } from './dtmi2path.js'

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
  const knownIds = []
  const rootAndDeps = []

  const fetchFromRepo = async (repoBaseUrl, path) => {
    try {
      console.log(`GET: ${repoBaseUrl}/${path}`)
      const doc = await (await window.fetch(`${repoBaseUrl}/${path}`)).json()
      rootAndDeps.push(doc)
      return true
    } catch (e) {
      console.log(e)
    }
  }

  const walkRepos = async (repos, dtmi) => {
    let found = false
    const file = dtmi2path(dtmi)
    for (let i = 0; i < repos.length; i++) {
      const r = repos[i]
      found = await fetchFromRepo(r, file)
      if (found) break
    }
    return found
  }

  const walkDeps = async (dtmi, repos) => {
    const found = await walkRepos(repos, dtmi)
    if (found) knownIds.push(dtmi)
    const doc = rootAndDeps.filter(d => d['@id'] === dtmi)[0]
    if (doc) {
      const deps = getDependencies(doc)
      for await (const d of deps) {
        if (knownIds.indexOf(d) === -1) {
          await walkDeps(d, repos)
        }
      }
    } else {
      console.log(`${dtmi} not found rootAndDeps array`)
    }

  }
  await walkDeps(dtmi, repos)
  return rootAndDeps
}
