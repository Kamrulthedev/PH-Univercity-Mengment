import { Router } from "express";
import { StudentRouts } from "../modules/student/student.route";
import { UserRouotes } from "../modules/users/user.routes";
import { AcademicSemesterRouts } from "../modules/academicSemester/acdemicSemester.route";
import { AcademicFacultyRotes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepermantRouter } from "../modules/academicDeperment/academicDerperment.route";



const router = Router()

router.use('/students', StudentRouts)
router.use('/users', UserRouotes)
router.use('/academic-semesters',AcademicSemesterRouts)
router.use('/academic-facultys',AcademicFacultyRotes)
router.use('/academic-deperments', AcademicDepermantRouter)


export default router;