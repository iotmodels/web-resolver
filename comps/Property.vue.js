import Schema from './Schema.vue.js'

export default {
  components: {
    Schema
  },
  props: ['property', 'schemas'],
  template: `
  [P] {{property.displayName ? property.displayName.en || property.displayName : ''}} '{{property.name}}'  <span>{{ property.writable === true ? '(*) ' : ''}}</span>
  <Schema :schema="property.schema" :schemas="schemas"></Schema>
  `
}
