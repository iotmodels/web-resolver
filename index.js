import { DtdlParser } from './DtdlParser.js'
import { resolve, dtmiToPath } from './resolve.js'

export default {
  data: () => ({
    tryExpanded: false,
    dtmi: 'dtmi:com:example:TemperatureController;1', // 'dtmi:test:schemas;1',
    repoBaseUrl: 'https://devicemodels.azure.com', // './test',
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
      return `${this.repoBaseUrl}${dtmiToPath(d)}`
    }
  }
}
