import {dtmiToPath,resolve} from './resolve.js'
export class dtdlViewModel {
    model = {}
    docs = []
    rootDoc = {}
    constructor (expanded) {
        this.docs = expanded
        this.rootDoc = expanded[0]
        this.model.id = this.rootDoc['@id']
        this.model.displayName = this.rootDoc.displayName
        this.model.Components = []
        this.addComp2Model('_default', this.rootDoc['@id']) 
        if (Array.isArray(this.rootDoc.contents)) {
          const components = this.rootDoc.contents.filter(c => c['@type'] === 'Component')
          components.forEach(c => {
            if (typeof c.schema !== 'object') {
              this.addComp2Model(c.name, c.schema)
            }
          })
        }
    }
    addComp2Model = (name, cschema) => {
        const comp = this.docs.filter(doc => doc['@id'] === cschema)[0]
        const compPos = this.model.Components.push({ properties: [], telemetry: [], commands: [] })
        const compItem = this.model.Components[compPos - 1]
        compItem.name = name
        compItem.schema = cschema
        compItem.schemaUrl = 'https://devicemodels.azure.com' + dtmiToPath(cschema).replace('.json', '.expanded.json')

        if (comp && comp.contents && Array.isArray(comp.contents)) {
        comp.contents.forEach(c => {
            if (Array.isArray(c['@type'])) {
            if (c['@type'].filter(t => t === 'Telemetry').length > 0) compItem.telemetry.push(c)
            if (c['@type'].filter(t => t === 'Property').length > 0) compItem.properties.push(c)
            } else {
            switch (c['@type']) {
                case 'Telemetry':
                compItem.telemetry.push(c)
                break
                case 'Property':
                compItem.properties.push(c)
                break
                case 'Command':
                compItem.commands.push(c)
                break
            }
            }
        })
    }
  }
}