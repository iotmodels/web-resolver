export const repoBaseUrl = 'devicemodels.azure.com'

export const isDtmi = dtmi => RegExp('^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$').test(dtmi)

export const dtmiToPath = dtmi => isDtmi(dtmi) ? `/${dtmi.toLowerCase().replace(/:/g, '/').replace(';', '-')}.json` : null

export const getDependencies = rootJson => {
  let deps = []
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

export const resolve = async (dtmi, x) => {
  let docs = []
  if (x) {
    docs = await (await window.fetch(`https://${repoBaseUrl}${dtmiToPath(dtmi).replace('.json', '.expanded.json')}`)).json()
  } else {
    const rootDoc = await (await window.fetch(`https://${repoBaseUrl}${dtmiToPath(dtmi)}`)).json()
    docs.push(rootDoc)
    const deps = getDependencies(rootDoc)
    for await (const d of deps) {
      const aDoc = await (await window.fetch(`https://${repoBaseUrl}${dtmiToPath(d)}`)).json()
      docs.push(aDoc)
    }
  }
  return docs
}