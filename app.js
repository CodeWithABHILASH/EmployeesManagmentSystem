const express= require('express')
const app=express()
const path=require('path')
const mongoose=require('mongoose')
const Employee=require('./models/employee');
const methodOverride=require('method-override')


mongoose.connect("mongodb+srv://ABHILASH_A:Mongo123456@cluster0.askpc.mongodb.net/WebPro_MajorProject1?retryWrites=true&w=majority")
    .then(()=>{
        console.log("MONGO CONNECTION OPEN");

    })
    .catch((err)=>{
        console.log("OH NO MONGO ERROR");
        console.log(err)
    })


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


app.get("/",(req,res)=>{
    res.render("domain");
  })

app.get("/UI-UX_Employees", async(req,res)=>{
     const Employees= await Employee.find({domain:"UI-UX"});
    res.render("UI_Employees",{Employees});
   })

app.get("/FrontEnd_Employees", async(req,res)=>{
    const Employees= await Employee.find({domain:"FrontEnd"});
   res.render("FE_Employees",{Employees});
  })

app.get("/BackEnd_Employees", async(req,res)=>{
    const Employees= await Employee.find({domain:"BackEnd"});
   res.render("BE_Employees",{Employees});
  })

  
app.get("/Employee/newUI",(req,res)=>{
     res.render("newUI");
    // res.send("HELLO")
 })

 app.post("/UI-UX_Employees",async(req,res)=>{
     const newEmployee = new Employee({name:req.body.name,domain:"UI-UX"});
     await newEmployee.save();
     res.redirect("/UI-UX_Employees")
 })

 app.get("/Employee/newFE",(req,res)=>{
    res.render("newFE");
 })

 app.post("/FrontEnd_Employees",async(req,res)=>{
     const newEmployee = new Employee({name:req.body.name,domain:"FrontEnd"});
     await newEmployee.save();
     res.redirect("/FrontEnd_Employees")
 })

 app.get("/Employee/newBE",(req,res)=>{
    res.render("newBE");
 })

 

 app.post("/BackEnd_Employees",async(req,res)=>{
     const newEmployee = new Employee({name:req.body.name,domain:"BackEnd"});
     await newEmployee.save();
     res.redirect("BackEnd_Employees")
 })

app.get("/Employee/:id", async(req,res)=>{
   const {id}= req.params;
   const result = await Employee.findById(id);
   res.render("details",{result})
 })

app.delete("/Employee/:id",async(req,res)=>{
    const {id}= req.params;
    const result = await Employee.findByIdAndDelete(id);
    res.redirect(`/${result.domain}_Employees`);
 
    
})

app.put("/Employee/:id", async(req,res)=>{
    const {id}= req.params;
    const result =await Employee.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    res.redirect(`/Employee/${id}`)
    
})



app.get("/Employee/:id/edit", async(req,res)=>{
    const {id}= req.params;
    const result = await Employee.findByIdAndUpdate(id);
    res.render("edit",{result})
})

 

app.listen(3000,()=>{
    console.log("Listening on port 3000!")
})