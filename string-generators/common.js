const PURPLE_COLOR = '\x1b[35m'
const RED_COLOR = '\x1b[31m'
const DEFAULT_COLOR = '\x1b[0m'

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

function createImportsString(imports, from) {
    const importedString = 
        imports.map(type => `${sp(4)}${type},\n`).join('')

    return `import {\n${importedString}} from './${from}'\n`
}

function log(msg) {
    console.log(PURPLE_COLOR, msg, DEFAULT_COLOR)
}

module.exports ={
    sp,
    caseChanger,
    createImportsString,
    log
}