import express from "express"

const router   = express.Router()
const messages = [
  {
    added: new Date(),
    text: "Hello, World!",
    user: "John Doe",
  },
  {
    added: new Date(),
    text: "Hello, friend!",
    user: "Jane Doe",
  },
]

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { messages, title: "Messages" })
})

router.get("/new", function (req, res, next) {
  res.render("form", { title: "New Message" })
})

router.post("/new", function (req, res, next) {
  messages.push({
    added: new Date(),
    text: req.body.text,
    user: req.body.user,
  })
  res.redirect("/")
})

export default router
