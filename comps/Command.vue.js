import Schema from './Schema.vue.js'
export default {
  data: () => ({
    showCmdDetails: false
  }),
  methods: {
    toggle () {
      this.showCmdDetails = !this.showCmdDetails
    }
  },
  components: {
    Schema
  },
  props: ['command', 'schemas'],
  template: `
    [C] {{command.name}}
    <span class="info">{{command.displayName ? command.displayName.en || command.displayName : ''}} </span>
    <span class="anchor" v-if="command.request || command.response" @click="toggle">
    {{showCmdDetails ? '-' : '+'}}
    </span>
    <div v-show="showCmdDetails">
    <div v-if="command.request" class="schemas">
      req: <Schema :schema="command.request ? command.request.schema || null :  null" :schemas="schemas"></Schema>
    </div>
    <div v-if="command.response" class="schemas">
      res: <Schema :schema="command.response ? command.response.schema || null :  null" :schemas="schemas"></Schema>
    </div>
    </div>
    `
}
