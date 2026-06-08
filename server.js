const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const LEADS_FILE = "leads.json";

if (!fs.existsSync(LEADS_FILE)) {
fs.writeFileSync(LEADS_FILE, "[]");
}

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "index.html"));
});

/* SAVE LEAD */
app.post("/api/leads", (req, res) => {

```
const leads = JSON.parse(fs.readFileSync(LEADS_FILE));

const lead = {
    id: Date.now(),
    fullname: req.body.fullname,
    idnumber: req.body.idnumber,
    phone: req.body.phone,
    age: req.body.age,
    createdAt: new Date()
};

leads.push(lead);

fs.writeFileSync(
    LEADS_FILE,
    JSON.stringify(leads, null, 2)
);

res.json({
    success: true
});
```

});

/* GET ALL LEADS */
app.get("/api/leads", (req, res) => {

```
const leads = JSON.parse(
    fs.readFileSync(LEADS_FILE)
);

res.json(leads);
```

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("Server running on " + PORT);
});
