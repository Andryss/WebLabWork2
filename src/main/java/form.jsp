<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page contentType="text/html;charset=UTF-8" %>
<html lang="en">
<head>
    <title>Form</title>
    <link rel="stylesheet" type="text/css" href="style/form.css">
</head>
<body>
<div class="hat outer">
    <p>Krivosheev Andrey Aleksandrovich, P32111, case 11333</p>
</div>
<div class="outer">
    <canvas id="plotCanvas" width="300" height="300"></canvas>
</div>
<div class="outer">
    <form id="submitForm" method="get">
        <p>
            Enter parameters
        </p>
        <p id="xField">
            <label>X: </label>
            <input id="xRadio-3" type="radio" name="xValue" value="-3"><label for="xRadio-3">-3</label>
            <input id="xRadio-2" type="radio" name="xValue" value="-2"><label for="xRadio-2">-2</label>
            <input id="xRadio-1" type="radio" name="xValue" value="-1"><label for="xRadio-1">-1</label>
            <input id="xRadio0" type="radio" name="xValue" value="0"><label for="xRadio0">0</label>
            <input id="xRadio1" type="radio" name="xValue" value="1"><label for="xRadio1">1</label>
            <input id="xRadio2" type="radio" name="xValue" value="2"><label for="xRadio2">2</label>
            <input id="xRadio3" type="radio" name="xValue" value="3"><label for="xRadio3">3</label>
            <input id="xRadio4" type="radio" name="xValue" value="4"><label for="xRadio4">4</label>
            <input id="xRadio5" type="radio" name="xValue" value="5"><label for="xRadio5">5</label>
            <small class="error-text"></small>
        </p>
        <p id="yField">
            <label>Y: </label>
            <input id="yTextField" name="yValue" type="text"
                   title="Y coordinate (-5 &#8804; Y &#8804; 3)"
                   placeholder="-5 &#8804; Y &#8804; 3" maxlength="10">
            <small class="error-text"></small>
        </p>
        <p id="rField">
            <label>R: </label>
            <input id="rCheckBox1" type="checkbox" name="rValue" value="1"><label for="rCheckBox1">1</label>
            <input id="rCheckBox2" type="checkbox" name="rValue" value="2"><label for="rCheckBox2">2</label>
            <input id="rCheckBox3" type="checkbox" name="rValue" value="3"><label for="rCheckBox3">3</label>
            <input id="rCheckBox4" type="checkbox" name="rValue" value="4"><label for="rCheckBox4">4</label>
            <input id="rCheckBox5" type="checkbox" name="rValue" value="5"><label for="rCheckBox5">5</label>
            <small class="error-text"></small>
        </p>
        <p>
            <input id="submitButton" type="submit" value="I'm lucky">
        </p>
    </form>
</div>
<div class="outer">
    <p>
        History
    </p>
    <table id="historyTable">
        <thead>
        <tr>
            <td class="number-col">#</td>
            <td class="time-col">Time</td>
            <td class="exec-time-col">Execution time</td>
            <td class="x-col">X</td>
            <td class="y-col">Y</td>
            <td class="r-col">R</td>
            <td class="result-col">Result</td>
        </tr>
        </thead>
        <tbody id="historyTableContent">
        <%--@elvariable id="history" type="java.util.List<model.Response>"--%>
        <c:forEach items="${history}" var="resp">
            <tr>
                <td>${history.indexOf(resp) + 1}</td>
                <td>${resp.responseTime}</td>
                <td>${resp.executionTime}</td>
                <td>${resp.x}</td>
                <td>${resp.y}</td>
                <td>${resp.r}</td>
                <td>${resp.resultString}</td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>
<img id="cookieImage" src="picture/cookie.png" alt="cute cookie">
<!-- Мммм, спасибо ебаным инструкциям за type="module" -->
<script type="module" src="script/form.js"></script>
</body>
</html>