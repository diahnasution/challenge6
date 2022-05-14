const router = require("express").Router();
//api
const auth = require("../middleware/auth");
const usergameController = require("../controllers/user-game-controller");
const usergamebiodataController = require("../controllers/user-game-biodata-controller");
const usergamehistoryController = require("../controllers/user-game-history-controller");
const {register, login} = require("../controllers/auth_api");


//view
const user_game = require("../controller-view/usergames");
const userbiodata = require("../controller-view/usergamebiodata")
const usergamehistory = require("../controller-view/usergamehistory");
const {registerPage, registerViews} = require("../controller-view/auth_views");

// api 
//User Game
router.get("/api/user-game", auth, usergameController.getuser_game);
router.get("/api/user-game/:id",auth, usergameController.getuser_gamebyid);
router.post("/api/user-game",auth, usergameController.createuser_game);
router.put("/api/user-game-update/:id",auth, usergameController.update_user_game);
router.delete("/api/user-game-delete/:id",auth, usergameController.deleteuser_game);

//User Game Biodata
router.get("/api/user-game-biodata",auth, usergamebiodataController.getuser_gamebio);
router.get("/api/user-game-biodata/:id",auth, usergamebiodataController.getuser_gamebyid);
router.post("/api/user-game-biodata", auth, usergamebiodataController.createuser_game);
router.put("/api/user-game-biodata-update/:id", auth,usergamebiodataController.update_user_game);
router.delete("/api/user-game-biodata-delete/:id", auth,usergamebiodataController.deleteuser_game);

//User Game History
router.get("/api/user-game-history",auth, usergamehistoryController.getuser_gamebio);
router.get("/api/user-game-history/:id", auth,usergamehistoryController.getuser_gamebyid);
router.post("/api/user-game-history", auth,usergamehistoryController.createuser_game);
router.put("/api/user-game-history-update/:id", auth, usergamehistoryController.update_user_game);
router.delete("/api/user-game-history-delete/:id", auth,usergamehistoryController.deleteuser_game );

router.post("/api/register", register);
router.post("/api/login", login);

//view
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/view/login');
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/view/usergames');
    }
    next();
  }

//user
router.get("/view/usergames", checkAuthenticated, user_game.getAllUserGame);
router.get("/view/usergames/create", checkAuthenticated, user_game.createUserGameForm);
router.post("/view/usergames/create", checkAuthenticated, user_game.createUserGame)
router.get("/view/usergames/update/:id", checkAuthenticated, user_game.getUserGameById)
router.post("/view/usergames/update/:id", checkAuthenticated, user_game.updateUserGame)
router.get("/view/usergames/delete/:id", checkAuthenticated, user_game.deleteUserGame)

//biodata
router.get("/view/usergamebiodata", checkAuthenticated,  userbiodata.getAllUserGame);
router.get("/view/usergamebiodata/create", checkAuthenticated,  userbiodata.createUserGameForm);
router.post("/view/usergamebiodata/create", checkAuthenticated,  userbiodata.createUserGame)
router.get("/view/usergamebiodata/update/:id", checkAuthenticated,  userbiodata.getUserGameById)
router.post("/view/usergamebiodata/update/:id", checkAuthenticated,  userbiodata.updateUserGame)
router.get("/view/usergamebiodata/delete/:id", checkAuthenticated,  userbiodata.deleteUserGame)

//history
router.get("/view/usergamehistory", checkAuthenticated, usergamehistory.getAllUserGame)
router.get("/view/usergamehistory/create", checkAuthenticated, usergamehistory.createUserGameForm);
router.post("/view/usergamehistory/create", checkAuthenticated, usergamehistory.createUserGame);
router.get("/view/usergamehistory/update/:id", checkAuthenticated, usergamehistory.getUserGameById);
router.post("/view/usergamehistory/update/:id", checkAuthenticated, usergamehistory.updateUserGame);
router.get("/view/usergamehistory/delete/:id", checkAuthenticated, usergamehistory.deleteUserGame);

router.get("/view/register", checkNotAuthenticated, registerPage);
router.post("/register", checkNotAuthenticated, registerViews);




module.exports = router;
