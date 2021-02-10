export const gbid = (id) => {
  const el = document.getElementById(id)
  if (el === null) throw new Error('element not found: ' + id)
  return el
}

export const bindTemplate = (template, models, target) => {
  gbid(target).innerHTML = Mustache.render(gbid(template).innerHTML, models)
}