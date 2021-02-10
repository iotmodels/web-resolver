import { gbid, bindTemplate } from './view.js'
import { dtmiToPath, resolve } from './resolve.js'
import { dtdlViewModel} from './dtdlViewModel.js' 

(async () => {
  gbid('sample-dtmis').onclick = that => { gbid('q').value = that.target.id }
  gbid('search').onclick = async () => {
    const dtmi = gbid('q').value
    let vm = {}
    try {
      const docs = await resolve(dtmi)
      vm = new dtdlViewModel(docs)
      bindTemplate('status-message', 'DTMI found: ' + dtmi, 'status')
      bindTemplate('model-template', vm.model, 'rendered')
    } catch (e) {   
      vm.model = {}
      bindTemplate('status-message', 'DTMI not found: ' + dtmiToPath(dtmi), 'status')
      bindTemplate('model-template', {}, 'rendered')
      throw e
    }
  }
})()
