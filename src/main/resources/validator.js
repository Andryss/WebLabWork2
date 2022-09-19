"use strict"

const cookieImage = $("#cookieImage");
const xField = $("input:radio[name='xValue']");
const yField = $("input:text[name='yValue']");
const rTextField = $("#rTextField");
const submitForm = $("#submitForm");
const historyTableContent = $("#historyTableContent");

// TODO: delete function for tests
submitForm.on("submit", function (event) {
    event.preventDefault();
    for (const elem of $("input[name=xValue]:checked")) {
        alert(elem.value)
    }
})


initializeFields()

function initializeFields() {
    initializeXField();
    initializeYField();
    initializeRField();
}



function initializeXField() {
    // TODO: implement
}

function getXValue() {
    // TODO: implement
}

function validateXField() {
    return validateNumberRadioField(xField);
}

function validateNumberRadioField(radioButtons) {
    if (isNotSelected(radioButtons)) return false;
    if (isNotNumberSelected(radioButtons)) return false;
    // TODO: complete this one
}

function isNotSelected(radioButtons) {
    // TODO: implement
}

function isNotNumberSelected(radioButtons) {
    // TODO: implement
}



const numberPattern = /^((-?[1-9]\d*(\.\d+)?)|(0(\.\d+)?)|(-0\.\d+))$/

function initializeYField() {
    ["keyup", "keydown"].forEach(function (event) {
        yField.on(event, function () { validateYField() })
    })
}

function getYValue() {
    if (validateYField()) {
        return parseFloat(yField.val())
    }
    return null
}

function validateYField() {
    return validateNumberTextField(yField, -3, 3);
}

function validateNumberTextField(textField, low = null, high = null) {
    if (isBlank(textField)) return false;
    if (isNotNumber(textField)) return false;
    if (isNotInRange(textField,low,high)) return false;
    makeValid(textField.parent()); return true;
}

function isBlank(textField) {
    if (textField.val() === "") {
        makeInvalid(textField.parent());
        textField.addClass("blank");
        return true;
    } else {
        textField.removeClass("blank");
        return false;
    }
}

function isNotNumber(textField) {
    if (!numberPattern.test(textField.val())) {
        makeInvalid(textField.parent());
        textField.addClass("not-a-number");
        return true;
    } else {
        textField.removeClass("not-a-number");
        return false;
    }
}

function isNotInRange(textField, low = null, high = null) {
    console.assert(low != null || high != null);
    if (low != null && high != null) console.assert(low <= high);
    const value = parseFloat(textField.val());
    console.assert(!isNaN(value));
    if (low && value < low || high && value > high) {
        makeInvalid(textField.parent());
        textField.addClass("out-of-range");return true;
    } else {
        textField.removeClass("out-of-range");
        return false;
    }
}



function initializeRField() {
    // TODO: implement
}

function getRValue() {
    // TODO: implement
}

function validateRField() {
    // TODO: implement
}



function makeInvalid(paragraph) {
    paragraph.removeClass("valid");
    paragraph.addClass("invalid");
}

function makeValid(paragraph) {
    paragraph.removeClass("invalid")
    paragraph.addClass("valid");
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

drawPlotOnCanvas(-1);

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

cookieImage.on("click", function () {
    if (Math.random() > 0.05) {
        alert("This site uses cookies, but you are not asked :>");
    } else {
        alert("Don't crumble your cookies here!");
    }
})