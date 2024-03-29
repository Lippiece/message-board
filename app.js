import path from "node:path"

import cookieParser from "cookie-parser"
import express from "express"
import createError from "http-errors"
import logger from "morgan"

import indexRouter from "./routes/index.js"
import usersRouter from "./routes/users.js"

const app     = express()
const dirname = path.dirname(new URL(import.meta.url).pathname)

// view engine setup
app.set("views", path.join(dirname, "views"))
app.set("view engine", "pug")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message
  res.locals.error   = req.app.get("env") === "development" ? error : {}

  // render the error page
  res.status(error.status || 500)
  res.render("error")
})

export default app
