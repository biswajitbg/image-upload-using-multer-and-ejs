
const path = require("path")
const express = require("express")
const app = express();

const mongoose = require("mongoose")
const multer = require("multer")
app.set("view engine","ejs")
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return  cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      
      return cb(null, `${Date.now()}-${file.originalname}`);
    },
  });


  const upload = multer({storage})


mongoose.connect("mongodb://localhost:27017/image-upload",{
    useNewUrlParser: true,

})

.then(()=>console.log("mongodb is connected"))
.catch(()=>console.log(error))



app.listen(3000,()=>{
    console.log("express app is running on port "+3000)

});

app.get("/",(req,res)=>{
    res.render("homepage")
});

app.post("/upload",upload.single("profileImage") , (req,res)=>{
    console.log(req.body)
    console.log(req.file)

    return res.redirect("/");

});
