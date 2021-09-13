const caseChanger = require('./common').caseChanger
const sp = require('./common').sp

function generateActionTypesString(moduleName, actionTypes) {
    const actionTypesConstantsString = createActionTypesConstantsString(actionTypes)
    const { dispatchTypesInterfacesString, dispatchTypeNames } = createDispatchTypesInterfacesString(actionTypes)
    const { dispatchTypeString, dispatchTypeName } = createDispatchType(moduleName, dispatchTypeNames)
    const resultString = [actionTypesConstantsString, dispatchTypesInterfacesString, dispatchTypeString].join('\n')

    return {
        actionTypesString: resultString,
        dispatchTypeName
    }
}

/*
    export const ACTION_ONE = 'ACTION_ONE'
    export const ACTION_TWO = 'ACTION_TWO'
*/
function createActionTypesConstantsString(actionTypes) {
    const actionTypesArray = actionTypes.map(type => `export const ${type} = '${type}'\n`)
    const actionTypesString = actionTypesArray.join('')
    
    return actionTypesString
}

function createDispatchTypesInterfacesString(actionTypes) {
    let dispatchTypeNames = []
    let dispatchTypesInterfacesArray = []

    actionTypes.forEach(type => {
        const { result: dispatchTypeName } = caseChanger(type)
        const dispatchTypeString = createDispatchTypesString(dispatchTypeName, type)

        dispatchTypeNames.push(dispatchTypeName)
        dispatchTypesInterfacesArray.push(dispatchTypeString)   
    })

    const dispatchTypesInterfacesString = dispatchTypesInterfacesArray.join('\n')

    return { dispatchTypesInterfacesString, dispatchTypeNames }
}

/*
    export interface ActionName {
        type: typeof ACTION_NAME
    }
*/
function createDispatchTypesString (dispatchTypeName, type) {
    return (
        `export interface ${dispatchTypeName} {\n`+
        `${sp(4)}type: typeof ${type}\n` +
        `}\n`
    )
}

/*
    ModuleNameDistpatchType = 
        ActionOne |
        ActionTwo
*/
function createDispatchType (moduleName, dispatchTypeName) {
    const moduleNameModified = moduleName[0].toUpperCase() + moduleName.slice(1).toLowerCase()
    const dispatchTypeNameFormatted = `${moduleNameModified}DispatchType`

    const dispatchTypesOptionsStringsArray = 
        dispatchTypeName.map((dt, index, arr) => 
            index === arr.length - 1
            ? `${sp(4)}${dt}\n`
            : `${sp(4)}${dt} |\n`
        )
    
    const result = `export type ${dispatchTypeNameFormatted} =\n${dispatchTypesOptionsStringsArray.join('')}`

    return {
        dispatchTypeString: result,
        dispatchTypeName: dispatchTypeNameFormatted
    }
}

module.exports = {
    generateActionTypesString
}