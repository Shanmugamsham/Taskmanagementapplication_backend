const router=require("express").Router()
const { createtask, gettasks, gettask, deletetask, updatetask } = require("../controllers/taskControllers")
const { verifyAccessToken } = require("../middleware/index");


router.post("/",verifyAccessToken,createtask)
router.get("/:id",verifyAccessToken,gettask)
router.delete("/:id",verifyAccessToken,deletetask)
router.put("/:id",verifyAccessToken,updatetask)




module.exports=router