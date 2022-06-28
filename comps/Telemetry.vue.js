import Schema from './Schema.vue.js'

export default {
  components: {
    Schema
  },
  props: ['telemetry', 'schemas'],
  template: `
    <div>
      [T] '{{telemetry.name}}' {{telemetry.displayName ? telemetry.displayName.en || telemetry.displayName.en : '' }}
      <Schema :schema="telemetry.schema" :schemas="schemas"></Schema>
    </div>
  `
}
