/**
 * @description Validates DTMI with RegEx from https://github.com/Azure/digital-twin-model-identifier#validation-regular-expressions
 * @param {string} dtmi
 */
const isDtmi = dtmi => {
  return RegExp('^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$').test(dtmi)
}

/**
 * @description Converts DTMI to /dtmi/com/example/device-1.json path.
 * @param {string} dtmi
 * @returns {string}
 */
export const dtmiToPath = dtmi => {
  if (!isDtmi(dtmi)) {
    return null
  }
  // dtmi:com:example:Thermostat;1 -> dtmi/com/example/thermostat-1.json
  return `/${dtmi.toLowerCase().replace(/:/g, '/').replace(';', '-')}.json`
}

/**
 * @description Returns external IDs in `extend` and `component` elements
 * @param {{ extends: any[]; contents: any[]; }} rootJson
 * @returns {Array<string>}
 */
export const getDependencies = rootJson => {
  let deps = []
  if (Array.isArray(rootJson)) {
    deps = rootJson.map(d => d['@id'])
    return deps
  }
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
