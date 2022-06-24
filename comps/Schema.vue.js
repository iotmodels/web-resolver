const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

export default {
  data: () => ({
    schemaName: '',
    resolvedSchema: {}
  }),
  props: ['schema', 'schemas'],
  created () {
    if (isObject(this.schema)) {
      // this.schemaName = 'inline schema'
      this.resolvedSchema = this.schema
    } else {
      if (this.schema && this.schema.startsWith('dtmi:')) {
        this.resolvedSchema = this.schemas.filter(s => s['@id'] === this.schema)[0]
      } else {
        this.schemaName = this.schema
      }
    }
  },
  template: `
  <div class="schemas">
    <div> {{schemaName}}</div>
    <ul v-if="resolvedSchema['@type'] === 'Object'">
        Object
        <li v-for="f in resolvedSchema.fields">{{f.name}} {{f.resolvedSchema}}</li>
    </ul>
    <ul v-if="resolvedSchema['@type'] === 'Enum'">
        Enum
        <li v-for="e in resolvedSchema.enumValues">{{e.name}} {{e.enumValue}}</li>
    </ul>
    <div v-if="resolvedSchema['@type'] === 'Array'"> Array of {{resolvedSchema.elementSchema}}</div>
    <div v-if="resolvedSchema['@type'] === 'Map'"> Map [{{resolvedSchema.mapKey.schema}},{{resolvedSchema.mapValue.schema}}] </div>
   </div>
  `
}
