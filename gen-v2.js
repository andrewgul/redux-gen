const log = require('./string-generators/common').log
const generateTypes = require('./string-generators/actionTypesGeneratorV2').generate
const generateCreators = require('./string-generators/actionCreatorsGeneratorV2').generateCreators
const fs = require('fs')

function main() {
    const requestName = getArgs()

    if (!requestName) {
        throw new Error('no request name!')
    }

    const generatedTypes = generateTypes(requestName)
    const generatedCreators = generateCreators(requestName)

    fs.writeFile(`result-v2/actionTypes.ts`, generatedTypes, (err) => {
        if (err) {
            console.error(err)
        }

        log(`actionTypes.ts created in /result-v2`)
    })

    fs.writeFile(`result-v2/actionCreators.ts`, generatedCreators, (err) => {
        if (err) {
            console.error(err)
        }

        log(`actionCreators.ts created in /result-v2`)
    })
}

function getArgs() {
    const args = process.argv.slice(2)

    return args[0]
}

main()