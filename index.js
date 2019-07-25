var express = require("express");
var bodyParser = require("body-parser");

//file system
const fs = require('fs');
//instance of app
const app = express();

//middleware of bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
const urlencodedParser = bodyParser.urlencoded({extended: false});

//array of task
var task = [];

fs.readFile(__dirname + '/tasks.csv' , 'utf8', (err,data) => {
    if(err) {

    }
    if(data){
        task = data.split('\n');
        console.log(complete);
    }
})

app.set("view engine", "ejs");

var com = []
var complete = [];
fs.readFile(__dirname + '/completed.csv' , 'utf8', (err,data) => {
    if(err) {

    }
    if(data){
        com = data.split('\n');
        console.log(task);
        complete=com.slice(1);
    }
})

app.post("/addtask", urlencodedParser, function(req, res) {
    var taskNew = req.body.newtask;
    task.push(taskNew);
    fs.appendFile('tasks.csv',`\n${taskNew}`,(err)=>console.error(err));
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        console.log(task.indexOf(completeTask));
        fs.appendFile('completed.csv',`\n${completeTask}`,(err)=>console.error(err));

        task.splice(task.indexOf(completeTask), 1);
        fs.writeFile('tasks.csv',task, err=>{
            if(err) throw err;
        });
    } 
    res.redirect("/");
});

app.get("/", function(req, res) {
    res.render("index", { task: task, complete: complete });
});

app.listen(2000, function() {
    console.log("server is running on port 2000");
});

app.use(express.static("public"));