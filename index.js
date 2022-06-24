import { DtdlParser } from './DtdlParser.js'
import { resolve, dtmiToPath } from './resolve.js'

export default {
  data: () => ({
    tryExpanded: false,
    dtmi: 'dtmi:test:schemas;1',
    repoBaseUrl: 'raw.githubusercontent.com/iotmodels/iot-plugandplay-models/schemas',
    loaded: false,
    Components: {},
    errInfo: ''
  }),
  methods: {
    async search () {
      try {
        this.errInfo = null
        const docs = await resolve(this.dtmi, this.tryExpanded, this.repoBaseUrl)
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
    },
    getDtmiUrl (d) {
      return `https://${this.repoBaseUrl}${dtmiToPath(d)}`
    }
  }
}
