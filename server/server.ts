import { createExpressMiddleware } from '@trpc/server/adapters/express'
import express from 'express'
import { createContext } from './context'
import { initDb } from './service'
import { appRouter as router } from './router'
import cors from 'cors'

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use((req, _res, next) => {
    console.log(`[${req.method}] ${req.url}`)
    next()
})
initDb()

app.use('/trpc', createExpressMiddleware({router, createContext}))

app.get("/", (req, res) => {
    res.status(200).send("Hello, world!")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
