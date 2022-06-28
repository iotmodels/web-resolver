import Schema from './Schema.vue.js'

export default {
  components: {
    Schema
  },
  props: ['property', 'schemas'],
  template: `
  [P] 
  <span title="Writable Property">{{ property.writable === true ? '(*) ' : ''}}</span>
  {{property.name}}
  <span class="info">{{property.displayName ? property.displayName.en || property.displayName : ''}} </span>
  <Schema :schema="property.schema" :schemas="schemas"></Schema>
  `
}
