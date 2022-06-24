import Schema from './Schema.vue.js'
export default {
  components: {
    Schema
  },
  props: ['command'],
  template: `
    [C] '{{command.name}}'
    req: <Schema :schema="command.request.schema || command.request || {}"></Schema>
    `
}
