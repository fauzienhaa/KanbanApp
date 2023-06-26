import express from "express"
import cors from "cors"
import session from "express-session"
import dotenv from "dotenv"
import db from "./config/Database.js"
import SequelizeStore from "connect-session-sequelize"
import UserRoute from "./routes/UserRoute.js"
import ProjectRoute from "./routes/ProjectRoute.js"
import JabatanRoute from "./routes/JabatanRoute.js"
import MemberRoute from "./routes/MemberRoute.js"
import AuthRoute from "./routes/AuthRoute.js"
import SectionRoute from "./routes/SectionRoute.js"
import TasksRoute from "./routes/TasksRoute.js"
import Jabatan from "./models/JabatanModel.js"
import Members from "./models/MembersModel.js"
import Tasks from "./models/TasksModel.js"
import Section from "./models/SectionModel.js"
import Users from "./models/UsersModel.js"
import parseJson from "parse-json"
// import Status from "./models/SectionsModel.js"
// import Board from "./models/Board.js"
// // import Reference from "./models/tes/index.js"

dotenv.config()

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

(async()=>{
    await db.sync();
})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

// app.use(parseJson);
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(UserRoute);
app.use(ProjectRoute);
app.use(JabatanRoute);
app.use(MemberRoute);
app.use(AuthRoute);
app.use(SectionRoute);
app.use(TasksRoute);
app.use(Tasks);
app.use(Members);
app.use(Jabatan);
app.use(Section);
app.use(Users);
// app.use(Status);
// app.use(Status);

store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...')
})

