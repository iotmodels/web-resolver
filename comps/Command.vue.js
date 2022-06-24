import Schema from './Schema.vue.js'
export default {
  components: {
    Schema
  },
  props: ['command', 'schemas'],
  template: `
    [C] '{{command.name}}'
    <div v-if="command.request" class="schemas">
      req: <Schema :schema="command.request ? command.request.schema || null :  null" :schemas="schemas"></Schema>
    </div>
    <div v-if="command.response" class="schemas">
      res: <Schema :schema="command.response ? command.response.schema || null :  null" :schemas="schemas"></Schema>
    </div>

    `
}
