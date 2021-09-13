const caseChanger = require('./common').caseChanger
const createImportsString = require('./common').createImportsString

const __4_ = '    '
const ______8_ = '        '

function generateActionCreatorsString(dispatchTypeName, actionTypes, moduleName) {
    const importFrom = moduleName + 'ActionTypes'
    const actionTypesImportString = createImportsString([...actionTypes, dispatchTypeName], importFrom)
    
    const actionCreatorsArray = actionTypes.map(type => {
        const {result: funcName, stringToChange: actionName} = caseChanger(type, true)
        return createActionCreatorString(funcName, actionName, dispatchTypeName)
    })
    const actionCreatorsFuncString = actionCreatorsArray.join('\n')
    const result = actionTypesImportString + '\n' + actionCreatorsFuncString

    return result
}

/*
    export const actionOne = (): DispatchType => {
        return {
            type: ACTION_ONE
        }
    }
*/
function createActionCreatorString(funcName, actionName, dispatchType) {
    return (
        `export const ${funcName} = (): ${dispatchType} => ({\n` +
        `${__4_}type: ${actionName}\n` +
        `})\n`
    )
}

module.exports = {
    generateActionCreatorsString
}