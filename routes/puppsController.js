const express = require(`express`);
const router = express.Router();
const pupps = require(`../models/pupps.js`);
const userProf = require('../models/user.js');
const jwt = require('jsonwebtoken');
// get routes -> index.handlebars
// router.get(`/`, function(req, res) {
//   res.render(`index`);
// });

let decoded;

function privateRoute(req, res, next) {
  let token;
  // let decoded;
  if (req.cookies.token) {
    token = req.cookies.token;
    decoded = jwt.verify(token, 'ilovepups');
  }
  if (decoded) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/set/:id', function(req, res) {
  const id = req.params.id;
  res.cookie('id-' + id, id, {maxAge: 6000000}).json({
    message: 'Cookie set!',
  });
  // res.render('index');
});

router.get('/', function(req, res) {
  userProf.all(function(data) {
    const hbsObject = {
      user: data,
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/profile', privateRoute, function(req, res) {
  userProf.all(function(data) {
    console.log(decoded);
    const hbsObject = {
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      zipCode: decoded.zipCode,
      puppyName: decoded.puppyName,
      puppyBreed: decoded.puppyBreed,
      puppyPersonality: decoded.puppyPersonality,
      puppyAge: decoded.puppyAge,
      puppyWeight: decoded.puppyWeight,
      imgUrl: decoded.imgUrl,
      // email: (jwt.verify(req.cookies.token.email, 'ilovepups'))
    };
    console.log(hbsObject);
    res.render('profile', hbsObject);
  });
});

router.get('/result', function(req, res) {
  res.render('result');
});

router.get('/scheduler', function(req, res) {
  res.render('scheduler');
});

router.get('/search', function(req, res) {
  userProf.all(function(data) {
    const hbsObject = {
      user: data,
    };
    console.log(hbsObject);
    res.render('search', hbsObject);
  });
});
//   console.log("checking for match...");
//   db.search.findOne({ where: { user_id: req.body.userId, match: req.body.matchId } })
//   .then(alreadyMatched => {
//     if (!alreadyMatched) {
//       db.MatchList.create({ 
//         user_id: req.body.userId,
//         match: req.body.matchId
//       })
//         .then(() => { db.MatchList.findOne({ where: { user_id: req.body.matchId, match: req.body.userId } })
//           .then(match => {
//             console.log("match found");
//             if (match) gotMatch(req.body.userId, req.body.matchId);
//             res.json(match ? true : false);
//         });
//       });
//     }
//     else {
//       db.MatchList.findOne({ where: { user_id: req.body.matchId, match: req.body.userId } })
//           .then(match => {
//             console.log("match found");
//             if (match) gotMatch(req.body.userId, req.body.matchId);
//             res.json(match ? true : false);
//         });
//     }
//   });
// });


router.get('/signup', function(req, res) {
  res.render('signup');
});

router.get('/thanks', function(req, res) {
  res.render('thanks');
});

module.exports = router;
