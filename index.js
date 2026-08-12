import express from "express";
import {userInfo} from "os";
import path from "path";
import { fileURLToPath } from "url";
import {v4 as uuidv4} from "uuid";

const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id : uuidv4(),
        username: "apnacollege",
        content: "I love Coding!! Happy Coding"
    },
    {
        id : uuidv4(),
        username: "ritesh_hood_07",
        content: "I am React Developer! I am from Jalna"
    },
    {
        id : uuidv4(),
        username: "shivrajj.jagtap",
        content: "I Frontend Developer! I am from Pune"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new");
})

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> p.id === id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>p.id===id);
    post.content = newContent;
    console.log(post);
    res.send("Patch route running");
});

app.listen(port,()=>{
    console.log(`Running on ${port}`);
});