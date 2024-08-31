import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import StudentModel from './models/Student.js'
import TodoModel from './models/Todo.js'
import joi from 'joi'
import bcrypt from 'bcrypt'
import bodyParser from "body-parser"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.listen(3001, () => {
    console.log("Server is Running")
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb+srv://paritoshpardeshi35:ksIwimVdcCXlFxD4@cluster0.qoagclq.mongodb.net/').then((data) => {
    console.log("mongodb connected ");
}).catch((err) => {
    console.log("errr", err);
})

app.post('/register', async(req, res) => {
    const { name, email, password ,role} = req.body;
//     const schema = joi.object({
//         name: joi.string().min(3).max(100).required(),
//         email: joi.string().email().required(),
//         password: joi.string().min(4).alphanum().required()
//     })
// console.log("ffff",req.body);
//     const { error, value } = schema.validate(req.body)
//     if (error) {
//         return res.status(400).json({ message: "Bad request", error })
    // }
    const stud = new StudentModel(req.body)
    stud.password = await bcrypt.hash(req.body.password, 10)
    const addUser = await StudentModel.create(stud);
    res.status(200).json({
        success: true,
        addUser
    })
})

app.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const userData = await StudentModel.findOne({ email: req.body.email })
        console.log('first', userData)
        if (!userData) {
            return res.status(401).json({
                message: 'Invalid username / password'
            })
        }

        const passwordAuth = await bcrypt.compare(req.body.password, userData.password)
        if (!passwordAuth) {
            return res.status(401).json({
                message: 'Invalid username / password'
            })
        }
        const tokenObject = {
            __id: userData.id,
            fullName: userData.fullName,
            email: userData.email,
            role : userData.role
        }


        const jwtToken = jwt.sign(tokenObject, "secret", { expiresIn: '4h' })
        const accessToken = jwt.sign({ email: email },
            "jwt-access-token-secret-key", { expiresIn: '5m' })
        const refreshToken = jwt.sign({ email: email },
            "jwt-refresh-token-secret-key", { expiresIn: '10m' })

        res.cookie('accessToken', accessToken, { maxAge: 60000 })

        res.cookie('refreshToken', refreshToken,
            { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' })
        return res.status(200).json({ jwtToken, userData })
    }
    catch (e) {
        console.log(e)

        return res.status(500).json({ message: e })

    }
})

const varifyUser = (req, res, next) => {
    const accesstoken = req.cookies.accessToken;
    if (!accesstoken) {
        if (renewToken(req, res)) {
            next()
        }
    } else {
        jwt.verify(accesstoken, 'jwt-access-token-secret-key', (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid Token" })
            } else {
                req.email = decoded.email
                next()
            }
        })
    }
}

const renewToken = (req, res) => {
    const refreshtoken = req.cookies.refreshToken;
    let exist = false;
    if (!refreshtoken) {
        return res.json({ valid: false, message: "No Refresh token" })
    } else {
        jwt.verify(refreshtoken, 'jwt-refresh-token-secret-key', (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid Refresh Token" })
            } else {
                const accessToken = jwt.sign({ email: decoded.email },
                    "jwt-access-token-secret-key", { expiresIn: '1m' })
                res.cookie('accessToken', accessToken, { maxAge: 60000 })
                exist = true;
            }
        })
    }
    return exist;
}

app.post("/createTodo", async (req, res) => {
    const addTodo = await TodoModel.create(req.body);
    res.status(200).json({
        success: true,
        addTodo
    })
})

app.get('/dashboard', varifyUser,(req, res) => {
    TodoModel.find({})
        .then(todos => res.json(todos))
        .catch((err => res.json(err)))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id
    TodoModel.findById({_id :id})
    .then(todos => res.json(todos))
        .catch((err => res.json(err)))
})

app.get('/', (req, res) => {
    TodoModel.find({})
        .then(todos => res.json(todos))
        .catch((err => res.json(err)))
})

app.post('/updateUser/:id', (req, res) => {
    const id = req.params.id
    TodoModel.findByIdAndUpdate({_id:id},{name : req.body.name,task : req.body.tasks})
        .then(todos => res.json(todos))
        .catch((err => res.json(err)))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id 
    TodoModel.findByIdAndDelete({_id:id})
        .then(todos => res.json(todos))
        .catch((err => res.json(err)))
})