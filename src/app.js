const express = require("express");

const app = express();

app.get("/login", (req, res) => {
    res.send("this is login server");

});
app.get("/register", (req, res) => {
    res.send("this is register page");

});

app.get("/logout", (req, res) => {
    res.send("this is logout");
})

app.listen(3333, () => {
    console.log("server is running 3333")
})
