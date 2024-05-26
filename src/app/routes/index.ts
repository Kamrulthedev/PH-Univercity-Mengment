import { Router } from "express";
import { StudentRouts } from "../modules/student/student.route";
import { UserRouotes } from "../modules/users/user.routes";


const router = Router()

router.use('/students', StudentRouts)
router.use('/users', UserRouotes)


export default router;