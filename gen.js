const fs = require('fs')
const generateActionTypesString = require('./string-generators/actionTypesGenerator').generateActionTypesString
const generateActionCreatorsString = require('./string-generators/actionCreatorsGenerator').generateActionCreatorsString
const log = require('./string-generators/common').log

async function main() {
    const { moduleName, actionTypes } = getArgs()

    if (!moduleName || !actionTypes || actionTypes.length === 0) {
        throw new Error('No arguments were provided!')
    }

    const { actionTypesString, dispatchTypeName } = generateActionTypesString(moduleName, actionTypes)
    const actionCreatorsString = generateActionCreatorsString(dispatchTypeName, actionTypes, moduleName)

    fs.writeFile(`result/${moduleName}ActionTypes.ts`, actionTypesString, (err) => {
        if (err) {
            console.error(err)
        }

        log(`${moduleName}ActionTypes.ts created in /result`)
    })

    fs.writeFile(`result/${moduleName}ActionCreators.ts`, actionCreatorsString, (err) => {
        if (err) {
            console.error(err)
        }

        log(`${moduleName}ActionCreators.ts created in /result`)
    })
}

function getArgs() {
    const args = process.argv.slice(2)

    return {
        moduleName: args[0],
        actionTypes: args.slice(1)
    } 
}

function sp(n = 1, filler = ' ') {
    const spaces = new Array(n).fill(filler).join('')

    return spaces
}

/*
    ACTION_NAME -> ActionName
    or
    ACTION_NAME -> actionName
*/
function caseChanger(stringToChange, firstIsLowerCase = false) {
    const wordsArray = stringToChange.split('_')
    const wordsArrayLowerCaseWithCapital = wordsArray.slice().map((word, index) => {
        if (firstIsLowerCase && index === 0) {
            return word.toLowerCase()
        }
        return word[0].toUpperCase() + word.slice(1).toLowerCase()
    })
    const result = wordsArrayLowerCaseWithCapital.join('')

    return { stringToChange, result }
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
        `}\n\n`
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

    return result
}

async function createDir(path) {
    fs.mkdir(__dirname + path, { recursive: true }, err => {
        if (err) throw err
    })
}
main()