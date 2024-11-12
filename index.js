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
  const users = await app.locals.pool.query("select * from users");
  let posts = await app.locals.pool.query("select * from posts");

  if (req.query.kanton) {
    posts = await app.locals.pool.query(
      "select * from posts where kanton = $1",
      [req.query.kanton]
    );
  }
  res.render("start", { posts: posts.rows, users: users.rows });
});

app.get("/beitrag/:id", async function (req, res) {
  const users = await app.locals.pool.query("select * from users");
  const posts = await app.locals.pool.query(
    `select * from posts WHERE id = ${req.params.id}`
  );
  res.render("beitrag", { posts: posts.rows, users: users.rows });
});

app.get("/profil", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }
  const posts = await app.locals.pool.query(
    "SELECT * FROM posts WHERE user_id = $1",
    [req.session.userid]
  );
  res.render("profil", { posts: posts.rows });
});

app.get("/create_beitrag", async function (req, res) {
  res.render("create_beitrag", {});
});

app.post("/create_post", upload.single("photo_url"), async function (req, res) {
  await app.locals.pool.query(
    "INSERT INTO posts (titel, description, kanton, google_maps, photo_url, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      req.body.titel,
      req.body.description,
      req.body.kanton,
      req.body.google_maps,
      req.file.filename,
      req.session.userid,
    ]
  );

  await app.locals.pool.query("INSERT INTO hashtags (tag_name) VALUES ($1)", [
    req.body.tag_name,
  ]);
  res.redirect("/");
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
