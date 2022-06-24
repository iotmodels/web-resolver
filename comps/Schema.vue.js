const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

export default {
  data: () => ({
    schemaName: 's name'
  }),
  props: ['schema'],
  created () {
    if (isObject(this.schema)) {
      this.schemaName = 'object'
    } else {
      this.schemaName = this.schema
    }
  },
  template: `
    <span> {{schemaName}}</span>
    <ul>
      <li v-for="f in schema.fields">{{f.name}} {{f.schema}}</li>
    </ul>
  `
}
