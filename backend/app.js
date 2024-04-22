import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import homeRoutes from './routes/home.js'
import userRoutes from './routes/user.js'
import adminRoutes from './routes/admin.js'
import createRoutes from './routes/create.js'
import postRoutes from './routes/posts.js'
import https from 'https'
import fs from 'fs'


const options = {
	key: fs.readFileSync('./certs/key.pem'),
	cert: fs.readFileSync('./certs/cert.pem')
}
const app = express()
const PORT = process.env.PORT || 8080


app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: true, credentials: true}))

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.use('/home', homeRoutes)
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/create', createRoutes)
app.use('/posts', postRoutes)


const server = https.createServer(options, app)

mongoose
	.connect('mongodb+srv://ppranav02:sFbiMbZZLXRKQLYz@vt-marketplace-cluster.jntaw3c.mongodb.net/')
	.then(() => server.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
	.catch((error) => console.log(`${error} could not connect`))

// mongoose
// .connect('mongodb+srv://gansh:PWJQGzrvAb9PMuXm@cluster0.nzkhjw4.mongodb.net/?retryWrites=true&w=majority')
// .then(() => app.listen(port, () => console.log(`Server Running on Port: ${port}`)))
// .catch((error) => console.log(`${error} could not connect`))
