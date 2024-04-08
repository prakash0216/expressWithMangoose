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

// let chat1=new Chat({
//     from:"neha",
//     to:"priya",
//     msg:"send me aiml notes",
//     created_at:new Date(),
// });

// chat1.save().then((res)=>{
//     console.log(res);
// })
// .then((err)=>{
//     console.log(err);
// })

let allChats=[
    {
        from:"vishnu",
        to:"mahesh",
        msg:"lets hang out",
        created_at:new Date(),
    },
    {
        from:"kumar",
        to:"vishwas",
        msg:"did you understand js callbacks",
        created_at:new Date(),
    },
    {
        from:"rahul",
        to:"santosh",
        msg:"are you going to college today",
        created_at:new Date(),
    },
    {
        from:"priya",
        to:"penny",
        msg:"did you recover from illness",
        created_at:new Date(),
    },
    {
        from:"shivani",
        to:"sheela",
        msg:"i am taking leave tommorow",
        created_at:new Date(),
    }
]

Chat.insertMany(allChats);