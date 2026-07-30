const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const SECRET_PASSWORD = "0106";

/* PASSWORD CHECK */

app.post("/check-password", (req, res) => {
    const { password } = req.body;

    if (password === SECRET_PASSWORD) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});


/* SAVE MESSAGE */

app.post("/save-message", (req, res) => {

    const { message } = req.body;

    // Validation
    if (!message || message.length > 200) {
        return res.status(400).json({ error: "Invalid message" });
    }

    const filePath = path.join(__dirname, "messages.json");

    let messages = [];

    try {
        messages = JSON.parse(fs.readFileSync(filePath));
    } catch {
        messages = [];
    }

    messages.push({
        text: message,
        date: new Date().toISOString()
    });

    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

    res.json({ success: true });
});


/* GET MESSAGES */

app.get("/get-messages", (req, res) => {

    const filePath = path.join(__dirname, "messages.json");

    let messages = [];

    try {
        messages = JSON.parse(fs.readFileSync(filePath));
    } catch {
        messages = [];
    }

    res.json(messages);
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});