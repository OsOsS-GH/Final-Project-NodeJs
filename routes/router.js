const express = require('express'),
    router = express.Router(),
    mainController = require('../app/controllers/main.controller');



router.get("/", mainController.home);
router.get("/about", mainController.about);
router.get("/contact", mainController.contact);
router.get("/blog", mainController.blog);
router.get("/photos", mainController.photos);
router.get("/testimonial", mainController.testimonial);




router.get('/images' , mainController.getImages);
router.post('/images' , mainController.storeImage);
router.get("/:id" , mainController.showImage);
router.patch("/:id" , mainController.updateImage);
// router.put("/:id" , mainController.updateImage);
router.delete("/:id" , mainController.deleteImage);




//Export Router
module.exports = router;
