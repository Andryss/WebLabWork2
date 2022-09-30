<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Welcome page</title>
    <link rel="stylesheet" type="text/css" href="style/index.css">
</head>
<body>
<div class="outer">
    <p>Welcome to ...</p>
    <label class="game-name">How not to get in the area</label>
    <p>game</p>
</div>
<div class="outer">
    <div>
        <img id="pepe-dance" src="picture/welcome.gif" alt="best dance in the world">
    </div>
    <div>
        <audio controls src="audio/welcome.mp3"></audio>
    </div>
</div>
<div class="outer">
    <p>
        To start the game click <a href="${pageContext.request.contextPath}/index">here</a>
    </p>
</div>
<img id="cookieImage" src="picture/cookie.png" alt="cute cookie">
<script type="module" src="script/index.js"></script>
</body>
</html>
