import { Router } from "express";
import { StudentRouts } from "../modules/student/student.route";
import { UserRouotes } from "../modules/users/user.routes";
import { AcademicSemesterRouts } from "../modules/academicSemester/acdemicSemester.route";
import { AcademicFacultyRotes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepermantRouter } from "../modules/academicDeperment/academicDerperment.route";
import { FacultiesRoter } from "../modules/Faculty/faculty.route";
import { AdminRouter } from "../modules/Admin/admin.route";
import { CouresRauter } from "../modules/Coures/Coures.route";
import { SemesterRegistrationRouter } from "../modules/SemesterRegistration/semesterRegistration.route";
import { OfferedCourseRoute } from "../modules/OfferedCoures/offeredCourse.route";
import { AUthRouter } from "../modules/Auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/students",
    route: StudentRouts,
  },
  {
    path: "/users",
    route: UserRouotes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRouts,
  },
  {
    path: "/academic-facultys",
    route: AcademicFacultyRotes,
  },
  {
    path: "/academic-deperments",
    route: AcademicDepermantRouter,
  },
  {
    path:'/faculties',
    route:FacultiesRoter
  },
  {
    path:'/admins',
    route: AdminRouter
  },
  {
    path:'/courses',
    route: CouresRauter
  },
  {
    path:'/semester-registration',
    route:SemesterRegistrationRouter
  },
  {
    path:'/offered-courses',
    route:OfferedCourseRoute
  },
  {
    path:'/auth',
    route:AUthRouter
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
