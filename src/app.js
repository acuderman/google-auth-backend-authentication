require('dotenv').config()
import express from 'express'
import exampleRouter from './routers/example/example'
import authRouter from './routers/auth'
import cors from 'cors'

const app = express();
const server = app.listen(process.env.PORT || 5000, function () {
   const host = server.address().address || 'localhost'
   const port = server.address().port
   
   console.log("Listening at http://%s:%s", host, port)
})

app.use(cors())

app.use(express.json());
app.use('/auth', authRouter);
app.use('/example', exampleRouter);

// match with this if no other route catches
app.use('/', (req, res) => {
   res.send('Ok')
});
