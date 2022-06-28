import Schema from './Schema.vue.js'

export default {
  components: {
    Schema
  },
  props: ['telemetry', 'schemas'],
  template: `
    <div>
      [T] {{telemetry.name}} <span class="info">{{telemetry.displayName ? telemetry.displayName.en || telemetry.displayName : '' }} </span>
      <Schema :schema="telemetry.schema" :schemas="schemas"></Schema>
    </div>
  `
}
