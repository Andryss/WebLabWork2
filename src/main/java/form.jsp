<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>JSP page</title>
</head>
<body>
    <label>I got</label>
    <label>X: <%= request.getParameter("xValue") %></label>
    <label>Y: <%= request.getParameter("yValue") %></label>
    <label>R: <%= request.getParameter("rValue") %></label>
</body>
</html>
