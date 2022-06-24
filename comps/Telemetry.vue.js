import Schema from './Schema.vue.js'

export default {
  components: {
    Schema
  },
  props: ['telemetry'],
  template: `
    [T] {{telemetry.displayName ? telemetry.displayName.en || telemetry.displayName.en : '' }} '{{telemetry.name}}'
    <Schema :schema="telemetry.schema"></Schema>
  `
}
