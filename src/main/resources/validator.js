"use strict"

/**
 * @type {NodeListOf<HTMLInputElement>}
 */
const xField = document.getElementsByName("xValue"),
    yField = document.getElementsByName("yValue"),
    rField = document.getElementsByName("rValue");
/**
 * @type {HTMLFormElement}
 */
const submitForm = document.getElementById("submitForm");
/**
 * @type {HTMLTableSectionElement}
 */
const historyTableContent = document.getElementById("historyTableContent");

const numberPattern = /^((-?[1-9]\d*(\.\d+)?)|(0(\.\d+)?)|(-0\.\d+))$/

/**
 * @type {boolean}
 */
let xValid = false,
    yValid = false,
    rValid = false;



submitForm.onsubmit = function (event) {
    event.preventDefault();
    if (validateFields()) {
        sendRequestToServer(
            validateAndGetXOrNull(),
            validateAndGetYOrNull(),
            validateAndGetROrNull()
        );
        clearFields();
    }
}


initializeFields()

function initializeFields() {
    initializeXField();
    initializeYField();
    initializeRField();
}

/**
 * @return {boolean}
 */
function validateFields() {
    let valid = false;
    valid = validateXField() && valid;
    valid = validateYField() && valid;
    valid = validateRField() && valid;
    return valid;
}

function clearFields() {
    clearXField();
    clearYField();
    clearRField();
    drawPlotOnCanvas(null);
}



function initializeXField() {
    xField.forEach(value => {
        value.onmousedown = () => {
            if (value.checked) {
                const unbind = () => {
                    value.onmouseup = () => {}
                }
                value.onmouseup = () => {
                    setTimeout(() => {value.checked = false}, 0)
                    unbind();
                }
                value.onmouseout = unbind
            }
        }
        value.onclick = () => {
            setTimeout(() => {
                validateXField()
            }, 0)
        }
    });
}

/**
 * @return {null|number}
 */
function validateAndGetXOrNull() {
    validateXField()
    return getXOrNull();
}

/**
 * @return {null|number}
 */
function getXOrNull() {
    if (!xValid) return null;
    for (let elem of xField) {
        if (elem.checked) return parseFloat(elem.value);
    }
    return null;
}

function clearXField() {
    xField.forEach(value => value.checked = false)
    xField[0].parentElement.classList.remove("valid")
    xValid = false;
}

/**
 * @return {boolean}
 */
function validateXField() {
    xValid = validateNumberRadioField(xField)
    return xValid;
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
function validateAndGetYOrNull() {
    validateYField();
    return getYOrNull();
}

/**
 * @return {null|number}
 */
function getYOrNull() {
    if (!yValid) return null;
    return parseFloat(yField[0].value);
}

function clearYField() {
    yField.forEach(value => value.value = "")
    yField[0].parentElement.classList.remove("valid")
    yValid = false;
}

/**
 * @return {boolean}
 */
function validateYField() {
    yValid = validateNumberTextField(yField[0], -5, 3);
    return yValid;
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
        value.onclick = (() => { drawPlotOnCanvas(validateAndGetROrNull()) })
    })
}

/**
 * @return {null|number}
 */
function validateAndGetROrNull() {
    validateRField();
    return getROrNull();
}

/**
 * @return {null|number}
 */
function getROrNull() {
    if (!rValid) return null;
    for (const elem of rField) {
        if (elem.checked) return parseFloat(elem.value);
    }
    return null;
}

function clearRField() {
    rField.forEach(value => value.checked = false)
    rField[0].parentElement.classList.remove("valid")
    rValid = false;
}

/**
 * @return {boolean}
 */
function validateRField() {
    rValid = validateNumberCheckboxField(rField);
    return rValid;
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

function sendRequestToServer(xValue, yValue, rValue) {

}

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

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("plotCanvas");

const {height, width} = canvas.getBoundingClientRect();
if (width !== height) {
    console.error("Plot is not a square");
}

const center = width / 2,
    unit = width / 10,

    axisWidth = width / 100,
    axisWidthOffset = (axisWidth - 1) / 2,
    axisMargin = width / 60,

    arrowLength = width / 20,
    arrowWidth = arrowLength / 3,

    streakLengthOffset = axisWidth,
    streakLength = 2 * streakLengthOffset + 1,
    streakWidth = axisWidth,
    streakWidthOffset = axisWidthOffset,

    fontSize = width / 15,
    fontSizeStr = "px",
    fontFamily = "Comic Sans MS",
    fontStr = fontSizeStr + " " + fontFamily,
    fontXVerticalOffset = streakLength,
    fontXHorizontalOffset = fontSize / 3,
    fontYHorizontalOffset = streakLength,
    fontYVerticalOffset = fontSize / 3,

    xVerticalOffset = fontSize + arrowWidth,
    yHorizontalOffset = arrowWidth * 4;

let xPoint = null,
    yPoint = null;
const pointRoundParam = 1e2;

/**
 * @param {number|null} newValue
 */
function setXPoint(newValue) {
    if (newValue == null) {
        xPoint = newValue;
    } else {
        xPoint = Math.round(newValue * pointRoundParam) / pointRoundParam;
    }
}

/**
 * @param {number|null} newValue
 */
function setYPoint(newValue) {
    if (newValue == null) {
        yPoint = newValue;
    } else {
        yPoint = Math.round(newValue * pointRoundParam) / pointRoundParam;
    }
}

drawPlotOnCanvas(null);

function drawPlot() {
    drawPlotOnCanvas(getROrNull())
}

/**
 * @param {number|null} rValue
 */
function drawPlotOnCanvas(rValue) {
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
        ctx.font = fontSize + fontStr;
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

        // red point
        if (xPoint != null && yPoint != null) {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(center + unit * xPoint, center - unit * yPoint, streakWidth, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.font = (fontSize / 2) + fontStr;
            ctx.fillText(" " + xPoint + ", " + yPoint + " ", center + unit * xPoint, center - unit * yPoint);
        }
    }
}

function getXCoordinateOrConvert(xOffset) {
    let xValue = getXOrNull();
    if (xValue == null) xValue = convertXValueInCoordinate(xOffset);
    return xValue;
}

function convertXValueInCoordinate(xOffset) {
    return (xOffset - center) / unit;
}

function getYCoordinateOrConvert(yOffset) {
    let yValue = getYOrNull();
    if (yValue == null) yValue = convertYValueInCoordinate(yOffset);
    return yValue;
}

function convertYValueInCoordinate(yOffset) {
    return - (yOffset - center) / unit;
}

canvas.onmousemove = (event) => {
    const bound = canvas.getBoundingClientRect();
    setXPoint(getXCoordinateOrConvert(event.x - bound.x));
    setYPoint(getYCoordinateOrConvert(event.y - bound.y));
    drawPlot();
}

canvas.onmouseleave = () => {
    setXPoint(null);
    setYPoint(null);
    drawPlot();
}

canvas.onclick = () => {
    const rValue = validateAndGetROrNull();
    if (rValue) {
        sendRequestToServer(xPoint,yPoint,rValue);
        clearFields();
    } else {
        alert("To point here you must set R value!");
        validateRField();
    }
}


document.getElementById("cookieImage").onclick = function () {
    if (Math.random() > 0.2) {
        alert("This site uses cookies, but you are not asked :>");
    } else {
        alert("Don't crumble your cookies here!");
    }
}