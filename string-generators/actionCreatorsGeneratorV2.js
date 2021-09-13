const caseChanger = require('./common').caseChanger

function generateCreators(requestName) {
    const { result } = caseChanger(requestName)

    return actionsString(requestName, result)
} 

const actionsString = (requestName, requestNameCamelCase) => (
`
import {
    ${requestName}_FETCHING,
    ${requestName}_FETCHED,
    ${requestName}_ERROR,
    ${requestName}_RESET,

    ${requestNameCamelCase}DispatchType,
} from './${requestNameCamelCase}ActionTypes'

export const ${requestNameCamelCase}ListFetching = (): ${requestNameCamelCase}DispatchType => ({
    type: ${requestName}_FETCHING
})

export const ${requestNameCamelCase}ListFetched = (payload: any): ${requestNameCamelCase}DispatchType => ({
    type: ${requestName}_FETCHED,
    payload
})

export const ${requestNameCamelCase}ListError = (error: any): ${requestNameCamelCase}DispatchType => ({
    type: ${requestName}_ERROR,
    error
})

export const ${requestNameCamelCase}ListReset = (): ${requestNameCamelCase}DispatchType => ({
    type: ${requestName}_RESET
})
`
)

module.exports = {
    generateCreators
}