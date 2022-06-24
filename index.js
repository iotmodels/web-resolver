import { dtdlViewModel} from './dtdlViewModel.js' 
import { resolve } from './resolve.js'

export default {
  data: () =>({
    tryExpanded: true,
    dtmi :'dtmi:com:example:TemperatureController;1',
    loaded :false,
    Components : {},
    errInfo : ''
  }),
  methods: {
    async search() {
      try
      {
        this.errInfo = null
        const docs = await resolve(this.dtmi, this.tryExpanded)
        const vm = new dtdlViewModel(docs)
        this.Components = vm.model.Components
        console.log(vm.model.Components)
      } catch (e) {
        this.errInfo = e
      }
      this.loaded = true
    },
    changeSelection(event) {
      this.dtmi = event.target.id
      this.Components = {}
    }
  }
}

