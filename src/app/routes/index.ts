import { Router } from "express";
import { StudentRouts } from "../modules/student/student.route";
import { UserRouotes } from "../modules/users/user.routes";
import { AcademicSemesterRouts } from "../modules/academicSemester/acdemicSemester.route";


const router = Router()

router.use('/students', StudentRouts)
router.use('/users', UserRouotes)
router.use('/academic-semesters', AcademicSemesterRouts)


export default router;