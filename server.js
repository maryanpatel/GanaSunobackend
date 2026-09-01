const path = require('path')
const app = require('./src/app')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const connectDB = require('./src/db/db')

connectDB()

app.listen(3000, () => {
    console.log('server is running on port 3000')
})