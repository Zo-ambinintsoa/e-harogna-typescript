require("dotenv").config();
import  express from "express";
import  cors  from "cors";
import { routes } from "./routes";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import bodyParser from "body-parser";

createConnection().then((connection) => {
    const app = express();
    const oneDay : number = 1000 * 60 * 60 * 24;
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(sessions({
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767bestoftheworld",
        saveUninitialized:true,
        cookie: { maxAge: oneDay },
        resave: false
    }));
    app.use(express.json());
    app.set('view engine', 'ejs');
    app.use(cors({
        credentials: true,
        origin: ["http://localhost:3000"]
        }));
    routes(app);
    app.use((req, res, next) => {
        res.status(404).
        render('404', {title:'404: Page Note Found', errors: 'Page Not found'});
    })
    app.use(function(error, req, res, next) {
        res.status(500).
        render('500', {title:'500: Internal Server Error', error: error});
    });
    app.use(function(error, req, res, next) {
        res.status(401).
        render('Auth/login', {title:'Autentification'});
    });
    app.listen(8000, ()=>{
    console.log("listening in port 8000");
    });

}).catch((err) => {
    console.log(err);
});
