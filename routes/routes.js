const express=require('express')
const userController=require('../controller/userController')
const projectConroller=require('../controller/projectcontroller')
const router=express.Router()
const jwtMiddle=require('../middleware/jwtmiddleware')
const multerconfig=require('../middleware/multermiddleware')



router.post('/register',userController.userRegister)
router.post('/login',userController.userlogin)
router.post('/addproject',jwtMiddle,multerconfig.single('image'),projectConroller.addProjects)
router.get('/all-project',jwtMiddle,projectConroller.allprojects)
router.get('/home-project',projectConroller.homeprojects)
router.get('/user-project',jwtMiddle,projectConroller.userprojects)
router.put('/edit-project/:pid',jwtMiddle,multerconfig.single('image'),projectConroller.editProject)
router.delete('/delete-project/:pid',jwtMiddle,projectConroller.removeProject)
router.put('/profile-update',jwtMiddle,multerconfig.single('profile'),userController.userupdateProfile)


module.exports=router