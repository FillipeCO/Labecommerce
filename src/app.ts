import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

// heroku port
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running')
})

export default app