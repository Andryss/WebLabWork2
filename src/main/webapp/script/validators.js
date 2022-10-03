"use strict"

/**
 * File contains functions validating html input tags
 */

/**
 * @type {RegExp}
 */
const numberPattern = /^((-?[1-9]\d*(\.\d+)?)|(0(\.\d+)?)|(-0\.\d+))$/


/*
Radio field validation
 */

/**
 * @param {NodeListOf<HTMLInputElement>} radioButtons
 * @returns {boolean}
 */
function validateNumberRadioField(radioButtons) {
    if (isNotSelected(radioButtons)) return false;
    if (isNotNumberSelected(radioButtons)) return false;
    makeListValid(radioButtons);
    return true;
}

/**
 * @param {NodeListOf<HTMLInputElement>} radioButtons
 * @return {boolean}
 */
function isNotSelected(radioButtons) {
    if (isSelectedCountInRange(radioButtons, 0, 0)) {
        makeListInvalid(radioButtons);
        parentElementAddClassList(radioButtons, "not-selected");
        return true;
    } else {
        parentElementRemoveClassList(radioButtons, "not-selected");
        return false
    }
}

/**
 * @param {NodeListOf<HTMLInputElement>} radioButtons
 * @param {Number} low
 * @param {Number} high
 * @return {boolean}
 */
function isSelectedCountInRange(radioButtons, low = null, high = null) {
    console.assert(low != null || high != null);
    if (low != null && high != null) console.assert(low <= high);
    let count = 0;
    radioButtons.forEach(value => {
        if (value.checked) count++
    });
    return !(low != null && count < low || high != null && count > high);
}

/**
 * @param {NodeListOf<HTMLInputElement>} radioButtons
 * @return {boolean}
 */
function isNotNumberSelected(radioButtons) {
    let onlyNumberSelect = true;
    for (const elem of radioButtons) {
        if (elem.checked && !(numberPattern.test(elem.value))) {
            onlyNumberSelect = false;
            break;
        }
    }
    if (!onlyNumberSelect) {
        makeListInvalid(radioButtons);
        parentElementAddClassList(radioButtons, "not-a-number-selected");
        return true;
    } else {
        parentElementRemoveClassList(radioButtons, "not-a-number-selected");
        return false
    }
}


/*
Text field validation
 */

/**
 * @param {NodeListOf<HTMLInputElement>} textFields
 * @param {Number} low
 * @param {Number} high
 * @returns {boolean}
 */
function validateNumberTextField(textFields, low = null, high = null) {
    if (isBlank(textFields)) return false;
    if (isNotNumber(textFields)) return false;
    if (isNotInRange(textFields, low, high)) return false;
    makeListValid(textFields);
    return true;
}

/**
 * @param {NodeListOf<HTMLInputElement>} textFields
 * @returns {boolean}
 */
function isBlank(textFields) {
    const textField = textFields[0];
    if (textField.value === "") {
        makeInvalid(textField);
        parentElementAddClass(textField, "blank");
        return true;
    } else {
        parentElementRemoveClass(textField, "blank");
        return false;
    }
}

/**
 * @param {NodeListOf<HTMLInputElement>} textFields
 * @returns {boolean}
 */
function isNotNumber(textFields) {
    const textField = textFields[0];
    if (!numberPattern.test(textField.value)) {
        makeInvalid(textField);
        parentElementAddClass(textField, "not-a-number-entered");
        return true;
    } else {
        parentElementRemoveClass(textField, "not-a-number-entered");
        return false;
    }
}

/**
 * @param {NodeListOf<HTMLInputElement>} textFields
 * @param {Number} low
 * @param {Number} high
 * @returns {boolean}
 */
function isNotInRange(textFields, low = null, high = null) {
    const textField = textFields[0];
    console.assert(low != null || high != null);
    if (low != null && high != null) console.assert(low <= high);
    const value = parseFloat(textField.value);
    console.assert(!isNaN(value));
    if (low && value < low || high && value > high) {
        makeInvalid(textField);
        parentElementAddClass(textField, "out-of-range");
        return true;
    } else {
        parentElementRemoveClass(textField, "out-of-range");
        return false;
    }
}


/*
Checkbox validation
 */

/**
 * @param {NodeListOf<HTMLInputElement>} checkBoxes
 * @return {boolean}
 */
function validateNumberCheckboxField(checkBoxes) {
    if (isNotSelected(checkBoxes)) return false; // the same as for radio button
    if (isNotNumberSelected(checkBoxes)) return false; // the same as for radio button
    if (isMoreThenOneSelected(checkBoxes)) return false;
    makeListValid(checkBoxes);
    return true;
}

/**
 * @param {NodeListOf<HTMLInputElement>} checkBoxes
 * @return {boolean}
 */
function isMoreThenOneSelected(checkBoxes) {
    if (isSelectedCountInRange(checkBoxes, 2)) {
        makeListInvalid(checkBoxes);
        parentElementAddClassList(checkBoxes, "more-then-one-selected");
        return true;
    } else {
        parentElementRemoveClassList(checkBoxes, "more-then-one-selected");
        return false
    }
}


/*
Clear functions
 */
/**
 * @param {NodeListOf<HTMLInputElement>} radioButtons
 */
function clearNumberRadioField(radioButtons) {
    parentElementRemoveClassList(radioButtons, "valid");
}

/**
 * @param {NodeListOf<HTMLInputElement>} textFields
 */
function clearNumberTextField(textFields) {
    parentElementRemoveClassList(textFields, "valid");
}

/**
 * @param {NodeListOf<HTMLInputElement>} checkBoxes
 */
function clearNumberCheckboxField(checkBoxes) {
    parentElementRemoveClassList(checkBoxes, "valid")
}


/*
Util functions
 */

/**
 * @param {HTMLElement} child
 * @param {String} className
 */
function parentElementAddClass(child, className) {
    child.parentElement.classList.add(className)
}

/**
 * @param {NodeListOf<HTMLElement>} childList
 * @param {String} className
 */
function parentElementAddClassList(childList, className) {
    parentElementAddClass(childList[0], className);
}

/**
 * @param {HTMLElement} child
 * @param {String} className
 */
function parentElementRemoveClass(child, className) {
    child.parentElement.classList.remove(className);
}

/**
 * @param {NodeListOf<HTMLElement>} childList
 * @param {String} className
 */
function parentElementRemoveClassList(childList, className) {
    parentElementRemoveClass(childList[0], className);
}

/**
 * @param {HTMLElement} inputHolder
 */
function makeInvalid(inputHolder) {
    parentElementAddClass(inputHolder, "invalid");
    parentElementRemoveClass(inputHolder, "valid");
}

/**
 * @param {NodeListOf<HTMLElement>} nodeList
 */
function makeListInvalid(nodeList) {
    makeInvalid(nodeList[0]);
}

/**
 * @param {HTMLElement} inputHolder
 */
function makeValid(inputHolder) {
    parentElementAddClass(inputHolder, "valid");
    parentElementRemoveClass(inputHolder, "invalid");
}

/**
 * @param {NodeListOf<HTMLElement>} nodeList
 */
function makeListValid(nodeList) {
    makeValid(nodeList[0]);
}


/*
Available exports
 */

export {
    validateNumberRadioField,
    validateNumberTextField,
    validateNumberCheckboxField,

    clearNumberRadioField,
    clearNumberTextField,
    clearNumberCheckboxField
}