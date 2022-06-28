import Schema from './Schema.vue.js'

export default {
  components: {
    Schema
  },
  props: ['property', 'schemas'],
  template: `
  [P] '{{property.name}}' <span>{{ property.writable === true ? '(*) ' : ''}}</span> 
  {{property.displayName ? property.displayName.en || property.displayName : ''}}
  <Schema :schema="property.schema" :schemas="schemas"></Schema>
  `
}
