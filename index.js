import { createApp } from "./config.js";

const app = createApp({
  user: "misty_brook_9996",
  host: "bbz.cloud",
  database: "misty_brook_9996",
  password: "78c6000b38d329e232b91a86ea5c24cc",
  port: 30211,
});

/* Startseite */
app.get("/", async function (req, res) {
  const users = await app.locals.pool.query("select * from users");
  res.render("start", { users: users.rows });
});

app.get("/beitrag", async function (req, res) {
  res.render("beitrag", {});
});

app.get("/profil", async function (req, res) {
  res.render("profil", {});
});

app.get("/create_beitrag", async function (req, res) {
  res.render("create_beitrag", {});
});

app.get("/login", async function (req, res) {
  res.render("login", {});
});

app.get("/registration", async function (req, res) {
  res.render("registration", {});
});

app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

app.get("/error", async function (req, res) {
  res.render("error", {});
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
