
export default {
  data: () => ({
    schemaType: 'string',
    schemaName: '',
    resolvedSchema: {},
    showSchema: false
  }),
  name: 'Schema',
  props: ['schema', 'schemas'],
  created () {
    const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
    if (isObject(this.schema)) {
      // this.schemaName = 'inline schema'
      this.schemaType = 'inline'
      this.resolvedSchema = this.schema
    } else {
      if (this.schema && this.schema.startsWith('dtmi:')) {
        this.schemaType = 'inline'
        this.resolvedSchema = this.schemas.filter(s => s['@id'] === this.schema)[0]
      } else {
        this.schemaType = 'string'
        this.resolvedSchema = this.schema
      }
    }
  },
  methods: {
    toggle () {
      this.showSchema = !this.showSchema
    }
  },
  template: `
<span v-if="schemaType === 'string'" class="schemaName"> [{{resolvedSchema}}]</span>
<span class="anchor" @click="toggle" v-if="schemaType!=='string'" :title="'Show schema ' + schema ">
{{showSchema ? '-' : '+'}}
</span>
<div>
  <div v-show="showSchema" class="schemas">
      <ul v-if="schemaType === 'inline'">
          <li v-for="f in resolvedSchema.fields">
              {{f.name}}
              <Schema :schema="f.schema" :schemas="schemas"></Schema>
          </li>
      </ul>
  </div>
  <ul v-if="resolvedSchema['@type'] === 'Enum'">
      <div v-show="showSchema" class="schemas">
          Enum
          <Schema :schema="resolvedSchema.valueSchema" :schemas="schemas"></Schema>
          <li class="righter" v-for="e in resolvedSchema.enumValues">
              {{e.name}} {{e.enumValue}}
          </li>
      </div>
  </ul>
  <div v-if="resolvedSchema['@type'] === 'Array'">
      <div v-show="showSchema" class="schemas">
          Array
          <Schema :schema="resolvedSchema.elementSchema" :schemas="schemas"></Schema>
      </div>
  </div>

  <div v-if="resolvedSchema['@type'] === 'Map'">
        <div v-show="showSchema" class="schemas">
          Map Key: <Schema :schema="resolvedSchema.mapKey.schema" :schemas="schemas"></Schema>
          Map Value: <Schema :schema="resolvedSchema.mapValue.schema" :schemas="schemas"></Schema>
      </div>
  </div>
</div>
  `
}
