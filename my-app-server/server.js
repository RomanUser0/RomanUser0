import express from "express"
import multer from "multer";
import mongoose from "mongoose"
import { registrValidator } from "./validations/auth.js";
import { postCreateValidator } from "./validations/post.js";
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/userController.js'
import * as PostController from './controllers/postController.js'


mongoose.set('strictQuery', true);
mongoose
    .connect('mongodb+srv://Roman:20roman20@cluster0.aev28q2.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))


const app = express();
app.use(express.json())

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({storage})

app.use('/uploads', express.static('uploads'))


app.post('/auth/login', UserController.login)
app.post('/auth/register', registrValidator, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `'/uploads/'${req.file.originalname}`
    })
})

app.post('/posts', checkAuth, postCreateValidator, PostController.create)
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.delete('/posts/:id', checkAuth, PostController.remove )
app.patch('/posts/:id', checkAuth, PostController.update)


app.listen(4444, () => {
    console.log('Server OK')
})