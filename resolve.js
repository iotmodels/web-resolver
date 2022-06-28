export const dtmiToPath = (dtmi) => `/${dtmi.toLowerCase().replace(/:/g, '/').replace(';', '-')}.json`

export const resolveDtmi = async (dtmi, x, baseRepo) => {
  const modelpath = `${baseRepo}${dtmiToPath(dtmi)}`
  if (x) {
    return await (await window.fetch(modelpath.replace('.json', '.expanded.json'))).json()
  } else {
    const root = []
    const model = await (await window.fetch(modelpath)).json()
    root.push(model)
    const children = model.contents.filter(c => c['@type'] === 'Component')
    for await (const compo of children) {
      if (root.filter(r => r['@id'] === compo.schema).length === 0) {
        const compoPath = `${baseRepo}${dtmiToPath(compo.schema)}`
        const compDoc = await (await window.fetch(compoPath)).json()
        root.push(compDoc)
      }
    }
    return root
  }
}
