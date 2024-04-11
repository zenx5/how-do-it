const {useContext} = require("react");
const HowDoitContext = require("./Context");

function useHowDoit() {
    return useContext(HowDoitContext)
}

module.exports = useHowDoit