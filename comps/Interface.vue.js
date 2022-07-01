import Property from './Property.vue.js'
import Telemetry from './Telemetry.vue.js'
import Command from './Command.vue.js'
import { dtmiToPath } from '../resolve.js'

export default {
  name: 'Interface',
  data: () => ({
    dtmi: '',
    dtmiPath: '',
    telemetries: [],
    properties: [],
    commands: [],
    resCompos: new Map()
  }),
  components: {
    Property, Telemetry, Command
  },
  props: ['interface', 'root', 'baseRepo'],
  created () {
    this.dtmi = this.interface['@id']
    this.dtmiPath = `${this.baseRepo}${dtmiToPath(this.dtmi)}`
    this.telemetries = this.interface.contents.filter(c => c['@type'].includes('Telemetry'))
    this.properties = this.interface.contents.filter(c => c['@type'].includes('Property'))
    this.commands = this.interface.contents.filter(c => c['@type'].includes('Command'))
    const compos = this.interface.contents.filter(c => c['@type'].includes('Component'))
    compos.forEach(c => {
      const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
      if (!isObject(c.schema) && c.schema.startsWith('dtmi:')) {
        this.resCompos.set(c.name, this.root.filter(r => r['@id'] === c.schema)[0])
      }
    })
  },
  template: `
    <div class="component">
    <h3>
      {{interface.displayName? interface.displayName.en || interface.displayName : ''}}
      <a :href="dtmiPath" target="_blank">{{dtmi}}</a>
    </h3>
    <span v-if="interface.description" class="description">{{interface.description.en || interface.description }}</span>

    <ul>
        <li v-for="t in telemetries">
            <Telemetry :telemetry="t" :schemas="interface.schemas"></Telemetry>
        </li>
        <li v-for="p in properties">
            <Property :property="p" :schemas="interface.schemas"></Property>
        </li>
        <li v-for="c in commands">
            <Command :command="c" :schemas="interface.schemas"></Command>
        </li>
        <li v-for="[key,value] in resCompos">
            <Interface :interface="value" :root="root" :baseRepo="baseRepo"></Interface>
        </li>
    </ul>
    <div>
  `
}
