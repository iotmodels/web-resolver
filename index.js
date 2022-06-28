import {resolveDtmi} from './resolve.js'

export default {
  data: () => ({
    // tryExpanded: false,
    // dtmi: 'dtmi:test:schemas;1',
    // repoBaseUrl: './test',
    tryExpanded: true,
    dtmi: 'dtmi:com:example:TemperatureController;1', // 'dtmi:test:schemas;1',
    repoBaseUrl: 'https://devicemodels.azure.com', // './test',
    loaded: false,
    model: [],
    errInfo: ''
  }),
  methods: {
    async search () {
      try {
        this.loaded = false
        this.errInfo = null
        this.model = await resolveDtmi(this.dtmi, this.tryExpanded, this.repoBaseUrl)
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
