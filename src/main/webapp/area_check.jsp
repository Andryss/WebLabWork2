<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="resp" scope="request" type="model.Response"/> <%-- the scope can be "session", but it sucks --%>

<%@ page contentType="text/html;charset=UTF-8" %>
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
            <td>${resp.responseTimeString}</td>
            <td>${resp.executionTime} ms</td>
            <td>${resp.x}</td>
            <td>${resp.y}</td>
            <td>${resp.r}</td>
            <c:choose>
                <c:when test="${resp.result}">
                    <td class="positive-result">${resp.resultString}</td>
                </c:when>
                <c:otherwise>
                    <td class="negative-result">${resp.resultString}</td>
                </c:otherwise>
            </c:choose>
        </tr>
        </tbody>
    </table>
</div>
<div class="outer">
    <c:choose>
        <c:when test="${resp.result}">
            <img class="result" src="picture/on-win.gif" alt="Congratulations!">
        </c:when>
        <c:otherwise>
            <img class="result" src="picture/on-lose.gif" alt="No time to cry!">
        </c:otherwise>
    </c:choose>
</div>
<div class="outer">
    <p>Want to test your luck again? Click <a href="${pageContext.request.contextPath}/index">here</a></p>
</div>
<img id="cookieImage" src="picture/cookie.png" alt="cute cookie">
<script src="script/area_check.js"></script>
</body>
</html>