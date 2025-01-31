const express = require("express");
const router = express.Router();
const userData = require("../models/customerScheme");
var moment = require('moment'); // require

router.get("/", (req, res) => {

  userData.find().then((item) => {
    res.render("index", { customersArr: item, moment: moment });
  }).catch((error) => {
    console.log(error);
  })
});

router.get("/user/add.html", (req, res) => {
  res.render("./user/add");
});
router.get("/edit/:id", (req, res) => {
  userData.findById(req.params.id).then(
    (result) => {
      res.render("./user/edit", { obj: result, moment: moment });
    }
  ).catch((error) => {
    console.log(error);
  });

});
router.get("/user/search.html", (req, res) => {
  res.render("./user/search");
});
router.get("/view/:id", (req, res) => {
  userData.findById(req.params.id).then((result) => {

    res.render("./user/view", { arr: result, moment: moment });
  }).catch((error) => {
    console.log(error);
  })
});


router.post("/user/add.html", (req, res) => {
    userData.create(req.body).then(
      () => {
        console.log(res.body);
        res.redirect("/");
      }
    ).catch((error) => {
      console.log(error);
    })
  });
  router.delete("/edit/:id", (req, res) => {
    userData.findByIdAndDelete(req.params.id)
      .then(
        () => {
          res.redirect("/");
        }
      ).catch((error) => {
        console.log(error);
      })
  })
  
  router.put("/edit/:id", (req, res) => {
    userData.findByIdAndUpdate(req.params.id,req.body).then(
      (result) => {
          console.log("*********************************************");
          console.log(result);
          console.log("*********************************************");
          res.redirect("/");
  
      }
    ).catch((error) => {
      console.log(error);
  
    })
  })
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  router.post("/search",(req,res) => {
    console.log("*****************************************");
    const founder = req.body.searchBody.trim()
    console.log(founder);
    userData.find({$or:[{firstName: founder} ,{lastName: founder},{gender: capitalizeFirstLetter(founder)},{country:capitalizeFirstLetter(founder)},]}).then(
      (result) => {
        console.log(result );
        res.render("user/search",{sarr : result,moment:moment})
      }
    ).catch((error) => {
      console.log(error );
    })
    console.log("*****************************************");
  })

  module.exports = router; 
