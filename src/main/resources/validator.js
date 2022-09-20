"use strict"

/**
 * @type {NodeListOf<HTMLInputElement>}
 */
const xField = document.getElementsByName("xValue");
/**
 * @type {NodeListOf<HTMLInputElement>}
 */
const yField = document.getElementsByName("yValue");
/**
 * @type {NodeListOf<HTMLInputElement>}
 */
const rField = document.getElementsByName("rValue");
/**
 * @type {HTMLFormElement}
 */
const submitForm = document.getElementById("submitForm");
/**
 * @type {HTMLTableSectionElement}
 */
const historyTableContent = document.getElementById("historyTableContent");

const numberPattern = /^((-?[1-9]\d*(\.\d+)?)|(0(\.\d+)?)|(-0\.\d+))$/



// TODO: delete function for tests
submitForm.onsubmit = function (event) {
    event.preventDefault();
    validateFields();
}


initializeFields()

function initializeFields() {
    initializeXField();
    initializeYField();
    initializeRField();
}

function validateFields() {
    validateXField();
    validateYField();
    validateRField();
}



function initializeXField() {
    xField.forEach(value => {
        value.onchange = (() => { validateXField() })
    });
}

/**
 * @return {null|number}
 */
function getXValue() {
    if (validateXField()) {
        // now is the only one selected radio with number
        for (let elem of xField) {
            if (elem.checked) return parseFloat(elem.value);
        }
        return null;
    }
    return null;
}

/**
 * @return {boolean}
 */
function validateXField() {
    return validateNumberRadioField(xField);
}

/**
 * @param {NodeListOf<HTMLInputElement>} radioButtons
 * @returns {boolean}
 */
function validateNumberRadioField(radioButtons) {
    if (isNotSelected(radioButtons)) return false;
    if (isNotNumberSelected(radioButtons)) return false;
    makeValid(radioButtons[0].parentElement); return true;
}

/**
 * @param {NodeListOf<HTMLInputElement>} radioButtons
 * @return {boolean}
 */
function isNotSelected(radioButtons) {
    if (isSelectedCountInRange(radioButtons, 0, 0)) {
        makeInvalid(radioButtons[0].parentElement);
        radioButtons[0].parentElement.classList.add("not-selected");
        return true;
    } else {
        radioButtons[0].parentElement.classList.remove("not-selected");
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
    radioButtons.forEach(value => { if (value.checked) count++ });
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
            onlyNumberSelect = false; break;
        }
    }
    if (!onlyNumberSelect) {
        makeInvalid(radioButtons[0].parentElement);
        radioButtons[0].parentElement.classList.add("not-a-number-selected");
        return true;
    } else {
        radioButtons[0].parentElement.classList.remove("not-a-number-selected");
        return false
    }
}



function initializeYField() {
    yField.forEach(element => {
        element.onkeyup = (() => { validateYField() });
        element.onkeydown = (() => { validateYField() });
    })
}

/**
 * @return {number|null}
 */
function getYValue() {
    if (validateYField()) {
        return parseFloat(yField[0].value);
    }
    return null;
}

/**
 * @return {boolean}
 */
function validateYField() {
    return validateNumberTextField(yField[0], -3, 3);
}

/**
 * @param {HTMLInputElement} textField
 * @param {Number} low
 * @param {Number} high
 * @returns {boolean}
 */
function validateNumberTextField(textField, low = null, high = null) {
    if (isBlank(textField)) return false;
    if (isNotNumber(textField)) return false;
    if (isNotInRange(textField,low,high)) return false;
    makeValid(textField.parentElement); return true;
}

/**
 * @param {HTMLInputElement} textField
 * @returns {boolean}
 */
function isBlank(textField) {
    if (textField.value === "") {
        makeInvalid(textField.parentElement);
        textField.parentElement.classList.add("blank");
        return true;
    } else {
        textField.parentElement.classList.remove("blank");
        return false;
    }
}

/**
 * @param {HTMLInputElement} textField
 * @returns {boolean}
 */
function isNotNumber(textField) {
    if (!numberPattern.test(textField.value)) {
        makeInvalid(textField.parentElement);
        textField.parentElement.classList.add("not-a-number-entered");
        return true;
    } else {
        textField.parentElement.classList.remove("not-a-number-entered");
        return false;
    }
}

/**
 * @param {HTMLInputElement} textField
 * @param {Number} low
 * @param {Number} high
 * @returns {boolean}
 */
function isNotInRange(textField, low = null, high = null) {
    console.assert(low != null || high != null);
    if (low != null && high != null) console.assert(low <= high);
    const value = parseFloat(textField.value);
    console.assert(!isNaN(value));
    if (low && value < low || high && value > high) {
        makeInvalid(textField.parentElement);
        textField.parentElement.classList.add("out-of-range");
        return true;
    } else {
        textField.parentElement.classList.remove("out-of-range");
        return false;
    }
}



function initializeRField() {
    rField.forEach(value => {
        value.onchange = (() => { drawPlotOnCanvas(getRValue()) })
    })
}

/**
 * @return {null|number}
 */
function getRValue() {
    if (validateRField()) {
        for (const elem of rField) {
            if (elem.checked) return parseFloat(elem.value);
        }
        return null;
    }
    return null;
}

/**
 * @return {boolean}
 */
function validateRField() {
    return validateNumberCheckboxField(rField);
}

/**
 * @param {NodeListOf<HTMLInputElement>} checkBoxes
 * @return {boolean}
 */
function validateNumberCheckboxField(checkBoxes) {
    if (isNotSelected(checkBoxes)) return false; // the same as for radio button
    if (isNotNumberSelected(checkBoxes)) return false; // the same as for radio button
    if (isMoreThenOneSelected(checkBoxes)) return false;
    makeValid(checkBoxes[0].parentElement); return true;
}

/**
 * @param {NodeListOf<HTMLInputElement>} checkBoxes
 * @return {boolean}
 */
function isMoreThenOneSelected(checkBoxes) {
    if (isSelectedCountInRange(checkBoxes, 2)) {
        makeInvalid(checkBoxes[0].parentElement);
        checkBoxes[0].parentElement.classList.add("more-then-one-selected");
        return true;
    } else {
        checkBoxes[0].parentElement.classList.remove("more-then-one-selected");
        return false
    }
}

/**
 * @param {HTMLElement} paragraph
 */
function makeInvalid(paragraph) {
    paragraph.classList.add("invalid");
    paragraph.classList.remove("valid");
}

/**
 * @param {HTMLElement} paragraph
 */
function makeValid(paragraph) {
    paragraph.classList.add("valid");
    paragraph.classList.remove("invalid");
}

//
// submitForm.on("submit", function (event) {
//     event.preventDefault();
//     validateForm();
// })
//
// function validateForm() {
//     if (validateFields()) {
//         sendFormToServer();
//     }
// }
//
// function validateFields() {
//     return validateXField() & validateYField() & validateRField();
// }
//
// function validateXField() {
//     return validateNumberTextField(xTextField, -3, 5);
// }
//

//
// function validateRField() {
//     return validateNumberTextField(rTextField, 0);
// }
//


// function sendFormToServer() {
//     $.ajax({
//         type: "GET",
//         url: "result.php",
//         dataType: "json",
//         data: {
//             "xValue": xTextField.val(),
//             "yValue": yTextField.val(),
//             "rValue": rTextField.val(),
//             "timezoneOffset": -(new Date().getTimezoneOffset())
//         }
//     }).done(function (res) {
//         handleResponse(res);
//     }).fail(function (msg, exception) {
//         alert("Something wrong: " + msg.status + " " + exception);
//     }).always(function () {
//         clearForm();
//     });
// }
//
// function handleResponse(response) {
//     const htmlTable = document.createElement("table");
//     for (let i = 0; i < response.length; i++) {
//         const element = response[i];
//         if (element != null) {
//             const htmlRow = document.createElement("tr");
//             const numCol = document.createElement("td");
//             numCol.append("" + (i + 1));
//             htmlRow.appendChild(numCol);
//             [
//                 "time",
//                 "executionTime",
//                 "xValue",
//                 "yValue",
//                 "rValue",
//                 "result"
//             ].forEach((prop) => {
//                 const col = document.createElement("td");
//                 col.append(element[prop]);
//                 htmlRow.appendChild(col);
//             })
//             htmlTable.appendChild(htmlRow);
//         }
//     }
//     historyTableContent.html(htmlTable.innerHTML);
// }
//
// function clearForm() {
//     xTextField.val("");
//     yTextField.val("");
//     rTextField.val("");
//
//     xTextField.removeClass("valid");
//     yTextField.removeClass("valid");
//     rTextField.removeClass("valid");
// }

drawPlotOnCanvas(null);

/**
 * @param {number|null} rValue
 */
function drawPlotOnCanvas(rValue) {
    const canvas = document.getElementById("plotCanvas");
    const {width, height} = canvas.getBoundingClientRect();
    if (width !== height) {
        return;
    }
    const center = width / 2,
        unit = width / 10;
    const axisWidth = width / 100,
        axisWidthOffset = (axisWidth - 1) / 2,
        axisMargin = width / 60;
    const arrowLength = width / 20,
        arrowWidth = arrowLength / 3;
    const streakLengthOffset = axisWidth,
        streakLength = 2 * streakLengthOffset + 1,
        streakWidth = axisWidth,
        streakWidthOffset = axisWidthOffset;
    const fontSize = 14,
        fontXVerticalOffset = streakLength,
        fontXHorizontalOffset = fontSize / 3,
        fontYHorizontalOffset = streakLength,
        fontYVerticalOffset = fontSize / 3;
    const xVerticalOffset = 1.6 * arrowLength,
        yHorizontalOffset = 1.2 * arrowLength;
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0,0,width,height);

        // ctx.strokeRect(0,0,width,height);

        if (rValue && rValue > 0) {
            const rValueHalf = rValue / 2;

            ctx.fillStyle = "lightblue";
            // area
            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.lineTo(center, center + rValue * unit);
            ctx.lineTo(center + rValueHalf * unit, center);
            ctx.lineTo(center + rValueHalf * unit, center - rValue * unit);
            ctx.lineTo(center, center - rValue * unit);
            ctx.lineTo(center, center - rValueHalf * unit);
            ctx.arcTo(center - rValueHalf * unit, center - rValueHalf * unit, center - rValueHalf * unit, center, rValueHalf * unit);
            ctx.fill();
        }

        ctx.fillStyle = "black";
        // OX
        ctx.fillRect(axisMargin, center - axisWidthOffset, width - 2 * axisMargin, axisWidth);
        ctx.beginPath();
        ctx.moveTo(width, center);
        ctx.lineTo(width - arrowLength, center - arrowWidth);
        ctx.lineTo(width - arrowLength, center + arrowWidth + 1);
        ctx.lineTo(width, center + 1);
        ctx.fill();

        // OY
        ctx.fillRect(center - axisWidthOffset, axisMargin, axisWidth, width - 2 * axisMargin);
        ctx.beginPath();
        ctx.moveTo(center, 0);
        ctx.lineTo(center - arrowWidth, arrowLength);
        ctx.lineTo(center + arrowWidth + 1, arrowLength);
        ctx.lineTo(center + 1, 0)
        ctx.fill();

        // lines
        ctx.fillRect(center - streakLengthOffset, center + 4 * unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center + 3 * unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center + 2 * unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center + unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center - unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center - 2 * unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center - 3 * unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center - 4 * unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center + 4 * unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center + 3 * unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center + 2 * unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center + unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center - unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center - 2 * unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center - 3 * unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center - 4 * unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);

        // text
        ctx.font = fontSize + "pt Comic Sans MS";
        ctx.fillText("-4", center - 4 * unit - fontXHorizontalOffset, center - fontXVerticalOffset);
        ctx.fillText("-3", center - 3 * unit - fontXHorizontalOffset, center - fontXVerticalOffset);
        ctx.fillText("-2", center - 2 * unit - fontXHorizontalOffset, center - fontXVerticalOffset);
        ctx.fillText("-1", center - unit - fontXHorizontalOffset, center - fontXVerticalOffset);
        ctx.fillText("1", center + unit - fontXHorizontalOffset, center - fontXVerticalOffset);
        ctx.fillText("2", center + 2 * unit - fontXHorizontalOffset, center - fontXVerticalOffset);
        ctx.fillText("3", center + 3 * unit - fontXHorizontalOffset, center - fontXVerticalOffset);
        ctx.fillText("4", center + 4 * unit - fontXHorizontalOffset, center - fontXVerticalOffset);

        ctx.fillText("-4", center + fontYHorizontalOffset, center + 4 * unit + fontYVerticalOffset);
        ctx.fillText("-3", center + fontYHorizontalOffset, center + 3 * unit + fontYVerticalOffset);
        ctx.fillText("-2", center + fontYHorizontalOffset, center + 2 * unit + fontYVerticalOffset);
        ctx.fillText("-1", center + fontYHorizontalOffset, center + unit + fontYVerticalOffset);
        ctx.fillText("1", center + fontYHorizontalOffset, center - unit + fontYVerticalOffset);
        ctx.fillText("2", center + fontYHorizontalOffset, center - 2 * unit + fontYVerticalOffset);
        ctx.fillText("3", center + fontYHorizontalOffset, center - 3 * unit + fontYVerticalOffset);
        ctx.fillText("4", center + fontYHorizontalOffset, center - 4 * unit + fontYVerticalOffset);

        ctx.fillText("X", width - fontSize - axisMargin, center + xVerticalOffset);
        ctx.fillText("Y", center - yHorizontalOffset, fontSize + axisMargin);
    }
}


document.getElementById("cookieImage").onclick = function () {
    if (Math.random() > 0.2) {
        alert("This site uses cookies, but you are not asked :>");
    } else {
        alert("Don't crumble your cookies here!");
    }
}