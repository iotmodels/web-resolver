import { DtdlParser } from './DtdlParser.js'
import { resolve } from './resolve.js'

export default {
  data: () => ({
    tryExpanded: true,
    dtmi: 'dtmi:com:example:TemperatureController;1',
    loaded: false,
    Components: {},
    errInfo: ''
  }),
  methods: {
    async search () {
      try {
        this.errInfo = null
        const docs = await resolve(this.dtmi, this.tryExpanded)
        const parser = new DtdlParser(docs)
        this.Components = parser.model.Components
        console.log(parser.model.Components)
      } catch (e) {
        this.errInfo = e
      }
      this.loaded = true
    },
    changeSelection (event) {
      this.dtmi = event.target.id
      this.Components = {}
    }
  }
}
