import { gbid, bindTemplate } from './view.js'
import { resolve, dtmiToPath, repoBaseUrl } from './resolve.js'
import { dtdlViewModel} from './dtdlViewModel.js' 

(async () => {
  gbid('sample-dtmis').onclick = that => { gbid('q').value = that.target.id }
  gbid('search').onclick = async () => {
    const dtmi = gbid('q').value
    const tryExpanded = gbid('tryExpanded').checked ? '.expanded.json' : '.json'
    let vm = {} 
    try {
      const docs = await resolve(dtmi, tryExpanded)
      vm = new dtdlViewModel(docs)
      bindTemplate('status-message', `OK from https://${repoBaseUrl}${dtmiToPath(dtmi).replace('.json', tryExpanded)}`, 'status')
      bindTemplate('model-template', vm.model, 'rendered')
    } catch (e) {   
      bindTemplate('status-message',`NOT FOUND from https://${repoBaseUrl}${dtmiToPath(dtmi).replace('.json', tryExpanded)}`, 'status')
      bindTemplate('model-template', {}, 'rendered')
      throw e
    }
  }
})()
