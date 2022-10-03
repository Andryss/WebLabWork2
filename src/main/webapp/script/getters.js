"use strict"

/**
 * File contains functions taking values from html input fields
 */

/*
Radio field getters
 */

/**
 * @param {NodeListOf<HTMLInputElement>} radioButtons
 * @return {null|number}
 */
function getRadioNumberValue(radioButtons) {
    for (let elem of radioButtons) {
        if (elem.checked) return parseFloat(elem.value);
    }
    return null;
}

/**
 * @param {NodeListOf<HTMLInputElement>} radioButtons
 * @return {null|string}
 */
function forcedGetRadioValue(radioButtons) {
    let checkedCount = 0
    let checkedValue = null;
    for (let elem of radioButtons) {
        if (elem.checked) {
            checkedCount++;
            checkedValue = elem.value;
        }
    }
    return (checkedCount === 1) ? checkedValue : null;
}


/*
Text field getters
 */

/**
 * @param {NodeListOf<HTMLInputElement>} textFields
 * @return {number|NaN}
 */
function getTextNumberValue(textFields) {
    return parseFloat(textFields[0].value);
}

/**
 * @param {NodeListOf<HTMLInputElement>} textFields
 * @return {string}
 */
function forcedGetTextValue(textFields) {
    return textFields[0].value;
}


/*
Checkbox field getters
 */

/**
 * @param {NodeListOf<HTMLInputElement>} checkBoxes
 * @return {number|null}
 */
function getCheckboxNumberValue(checkBoxes) {
    return getRadioNumberValue(checkBoxes); // the same as for the radio field
}

/**
 * @param {NodeListOf<HTMLInputElement>} checkBoxes
 * @return {string|null}
 */
function forcedGetCheckboxValue(checkBoxes) {
    return forcedGetRadioValue(checkBoxes); // the same as for the radio field
}


/*
Available exports
 */

export {
    getRadioNumberValue,
    forcedGetRadioValue,

    getTextNumberValue,
    forcedGetTextValue,

    getCheckboxNumberValue,
    forcedGetCheckboxValue
}