import { createApp, upload } from "./config.js";

const app = createApp({
  user: "misty_brook_9996",
  host: "bbz.cloud",
  database: "misty_brook_9996",
  password: "78c6000b38d329e232b91a86ea5c24cc",
  port: 30211,
});

/* Startseite */
app.get("/", async function (req, res) {
  res.render("start");
});

app.get("/menu", async function (req, res) {
  res.render("menu");
});

app.get("/ueberuns", async function (req, res) {
  res.render("ueberuns");
});

app.get("/kontakt", async function (req, res) {
  res.render("kontakt");
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
