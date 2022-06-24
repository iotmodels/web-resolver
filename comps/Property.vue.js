import Schema from './Schema.vue.js'

export default {
  components: {
    Schema
  },
  props: ['property'],
  template: `
  [P] {{property.displayName.en || property.displayName}} '{{property.name}}'  <span>{{ property.writable === true ? '(*) ' : ''}}</span>
  <Schema :schema="property.schema"></Schema>
  `
}
