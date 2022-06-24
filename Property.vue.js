export default {
  props: ['property'],
  template: `
  [P] {{property.displayName.en || property.displayName}} '{{property.name}}'  <span>{{ property.writable === true ? '(*)' : ''}}</span>
  `
}
