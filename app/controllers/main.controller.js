const Image = require('../models/image');
const mongoose = require('mongoose');

function getImages(req , res) {
    Image.find({})
    .select("_id title")
    .then(images => {
        if(images.length > 0) {
            res.json({
                method : "GET" ,
                url : "http://localhost:3000/images" ,
                images : images ,
                message : "Images Retrieved Successfully !"
            })
        }else {
            res.status(404).json({message : "NO Images Yet "})
        }
    }).catch(err => {
        res.status(500).json({error : err.message})
    })
}

// Add New Image
function storeImage(req , res) {
    const image = new Image({
        _id : new mongoose.Types.ObjectId() ,
        title : req.body.title 
    });
    image.save().then(image => {
        console.log(image)
        res.status(201).json({
            method : "POST" ,
            url : "http://localhost:3000/images" ,
            image : image ,
            message : "Image Saved Successfully "
        })
    })
    .catch(err => {
        res.status(500).json({error : err.message})
    })
}

// Show Single Image
function showImage(req , res)  {
    const id = req.params.id;
    Image.findById(id)
    .select("_id title")
    .then(image => {
        if(image) {
            res.status(200).json({
                method : "GET" ,
                url : `http://localhost:3000/images/${id}` ,
                image : image ,
                message : "Image Retrieved Successfully !"
            })
        }else{
            res.status(404).json({message : "Error 404 Image Not Found"})
        }
    }).catch(err => {
        res.status(500).json({error : err.message})
    })
}

// Update Image
function updateImage(req , res) {
    const id = req.params.id;
    Image.findByIdAndUpdate(id , {$set : req.body})
    .then(result => {
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(404).json({message : "Image Not Found"})
        }
    }).catch(err => {
        res.status(500).json({error : err.message})
    })
}

// Delete Image
function deleteImage(req , res) {
    const id = req.params.id;
    Image.deleteOne({_id : id})
    .then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({error : err.message})
    })
}

function home(req, res) {
    res.render('pages/home.ejs',
        { title: "Home Page" });
}

function about(req, res) {
    res.render('pages/about.ejs',
        { title: "About Page" });
}

function contact(req, res) {
    res.render('pages/contact.ejs',
        { title: "Contact Page" });
}

function blog(req, res) {
    res.render('pages/blog.ejs',
        { title: "Blog" });
}

function testimonial(req, res) {
    res.render('pages/testimonial.ejs',
        { title: "Testimonial" });
}

function photos(req, res) {
    res.render('pages/photos.ejs',
        { title: "Photos" });
}

module.exports = {
    home,
    about,
    contact,
    photos,
    testimonial,
    blog,
    getImages ,
    storeImage ,
    showImage ,
    updateImage ,
    deleteImage
}