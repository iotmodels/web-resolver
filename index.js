import { gbid, bindTemplate } from './view.js'
import { resolve, dtmiToPath, repoBaseUrl } from './resolve.js'
import { dtdlViewModel} from './dtdlViewModel.js' 

(async () => {
  gbid('sample-dtmis').onclick = that => { gbid('q').value = that.target.id }
  gbid('search').onclick = async () => {
    try {
      const dtmi = gbid('q').value
      const tryExpanded = gbid('tryExpanded').checked
      const docs = await resolve(dtmi, tryExpanded)
      const vm = new dtdlViewModel(docs)
      bindTemplate('status-message', 'OK', 'status')
      bindTemplate('model-template', vm.model, 'rendered')
    } catch {   
      bindTemplate('status-message','NOT FOUND', 'status')
      bindTemplate('model-template', {}, 'rendered')
      throw e
    }
  }
})()
