const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const PORT = process.env.PORT || 8080;// adding extra


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
mongoose.connect(process.env.ATLASDB_URL, {useNewUrlParser:true, useUnifiedTopology:true});// adding extra


main().then(()=>{
    console.log("Connection-Succesfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/",(req, res)=>{
    res.send("hello i am Groot");
});

//Index Rout
app.get("/listings",async (req, res)=>{
    const allListing= await Listing.find({});
    res.render("listings/index.ejs",{allListing});
});

// Add Listing Rout
app.get("/listings/new",(req, res)=>{
     res.render("listings/new.ejs");
});

//Show Rout
app.get("/listings/:id",async (req, res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});

});
// Create Rout
app.post("/listings", async (req,res)=>{
    let newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    // console.log(newListing);
});

//Edit rout
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}) ;
//Update rout
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{ ...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//Delete rout
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}) ;

// app.get("/testing", async (req,res)=>{
//     let samplelisting=new Listing({
//         title:"My new Villa",
//         description:"best night view",
//         price : 150 00,
//         location: "shiv nagar Rishikesh",
//         country:"India"
//     });
//      await samplelisting.save();
//      console.log("sample saved succesfull");
//      res.send("sample is saving");

// });

// app.listen(8080,()=>{
//     console.log("Listening on Port 8080");// this is original
// });
app.listen(PORT, () => console.log(`Listening on ${PORT}`)); // adding extra
