const caseChanger = require('./common').caseChanger

function generate(requestName) {
    const { result } = caseChanger(requestName)

    return typesString(requestName, result)
}

const typesString = (requestName, requestNameCamelCase) => (
    `
    export const ${requestName}_FETCHING = '${requestName}_FETCHING'
    export const ${requestName}_FETCHED = '${requestName}_FETCHED'
    export const ${requestName}_ERROR = '${requestName}_ERROR'
    export const ${requestName}_RESET = '${requestName}_RESET'

    export interface ${requestNameCamelCase}Fetching {
        type: typeof ${requestName}_FETCHING
    }

    export interface ${requestNameCamelCase}Fetched {
        type: typeof ${requestName}_FETCHED
        payload: any
    }

    export interface ${requestNameCamelCase}Error {
        type: typeof ${requestName}_ERROR
        error: any
    }

    export interface ${requestNameCamelCase}Reset {
        type: typeof ${requestName}_RESET
    }

    export type ${requestNameCamelCase}DispatchType =
        ${requestNameCamelCase}Fetching |
        ${requestNameCamelCase}Fetched |
        ${requestNameCamelCase}Error |
        ${requestNameCamelCase}Reset
    `
)

module.exports = {
    generate
}