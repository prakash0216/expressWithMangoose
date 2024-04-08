const express=require("express");
const app=express();
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

const mongoose = require('mongoose');
const Chat=require("./models/chat.js");

main()
.then((res)=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let port=3000;

app.listen("3000",()=>{
    console.log("server is listening");
});

app.get("/",(req,res)=>{
    res.send("working");
})

//Index route
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find({});
    // console.log(chats);
    res.render("index.ejs",{chats});
});

//new
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//create route
app.post("/chats",(req,res)=>{
    let{from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date,
    });
    // console.log(newChat);
    newChat
    .save().
    then((res)=>{
        console.log("chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

//update
app.get("/chats/:id/edit",async(req,res)=>{
    let{id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let{msg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id,{msg:msg},{runValidators:true,new:true});
    console.log(updatedChat);
    res.redirect("/chats");
})

//delete
app.delete("/chats/:id/delete",async(req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});