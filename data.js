
const mongoose=require('mongoose')
const Employee=require('./models/employee');

mongoose.connect("mongodb+srv://ABHILASH_A:Mongo123456@cluster0.askpc.mongodb.net/WebPro_MajorProject1?retryWrites=true&w=majority")
    .then(()=>{
        console.log("MONGO CONNECTION OPEN");

    })
    .catch((err)=>{
        console.log("OH NO MONGO ERROR");
        console.log(err)
    })
const data =[
{name:"Jatin Kumar Verma",domain:"UI-UX"},
{name:"Vishal",domain:"UI-UX"},
{name:"Ansh Arora",domain:"UI-UX"},
{name:"Shaurya Srinet",domain:"UI-UX"},
{name:"Pragya Nidhi",domain:"UI-UX"},
{name:"Tautik Agrahari",domain:"FrontEnd"},
{name:"Chetanya Jangra",domain:"FrontEnd"},
{name:"M Sushant",domain:"FrontEnd"},
{name:"infant Aswith J",domain:"FrontEnd"},
{name:"Abhilash A",domain:"BackEnd"}
]


 Employee.insertMany(data)
.then(res=>{
    console.log(res)
})
.catch(e=>{
    console.log(e)
})