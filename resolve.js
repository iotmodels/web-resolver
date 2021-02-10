const repoBaseUrl = 'devicemodels.azure.com'
const isDtmi = dtmi => RegExp('^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$').test(dtmi)
export const dtmiToPath = dtmi => isDtmi(dtmi) ? `/${dtmi.toLowerCase().replace(/:/g, '/').replace(';', '-')}.json` : null
export const resolve = async dtmi =>  await (await window.fetch(`https://${repoBaseUrl}${dtmiToPath(dtmi).replace('.json', '.expanded.json')}`)).json()