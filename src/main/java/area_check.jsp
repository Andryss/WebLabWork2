<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="resp" scope="request" type="model.Response"/>

<html lang="en">
<head>
    <title>Result</title>
    <link rel="stylesheet" type="text/css" href="style/area_check.css">
</head>
<body>
<div class="outer">
    <p>
        Result
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
        <tr>
            <td>#</td>
            <td>${resp.responseTime}</td>
            <td>${resp.executionTime}</td>
            <td>${resp.x}</td>
            <td>${resp.y}</td>
            <td>${resp.r}</td>
            <td>${resp.resultString}</td>
        </tr>
        </tbody>
    </table>
</div>
<div class="outer">
    <label>Want to test your luck again? Click </label><a href="${pageContext.request.contextPath}/">here</a>
</div>
<img id="cookieImage" src="picture/cookie.png" alt="cute cookie">
<script src="script/area_check.js"></script>
</body>
</html>