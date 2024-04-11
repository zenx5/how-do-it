const { createContext } = require('react')

const HowDoitContext = createContext({
    createDataset: key => ({ 'data-howdoit': key })
})

module.exports = HowDoitContext