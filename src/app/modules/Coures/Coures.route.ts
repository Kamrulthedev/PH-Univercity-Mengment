import express from "express";
import { CouresControllar } from "./Coures.controllar";
import validationRequest from "../../milddlerwer/validate.Request";
import { CouresValidation } from "./Coures.validation";
import AuthValidated from "../../milddlerwer/auth.validated";

const router = express.Router();

router.post(
  "/create-course",
  AuthValidated("admin"),
  validationRequest(CouresValidation.CouresValidationSchema),
  CouresControllar.createCouresDb
);

router.get(
  "/",
  CouresControllar.getAllCouresDb
);

router.get(
  "/:id",
  AuthValidated("student", "faculty", "admin"),
  CouresControllar.getSingleCouresDb
);

router.delete("/:id", AuthValidated("admin"), CouresControllar.deleteCouresDb);

router.put(
  "/:courseId/assign-faculties",
  validationRequest(CouresValidation.assignFacultiseWithCourseValidaitonSchema),
  CouresControllar.assignFacultiseWithCourseDb
);

router.delete(
  "/:courseId/remove-faculties",
  validationRequest(CouresValidation.assignFacultiseWithCourseValidaitonSchema),
  CouresControllar.removeFacultyWithCourseDb
);

router.patch(
  "/:id",
  AuthValidated("admin"),
  validationRequest(CouresValidation.UpdateCouresValidationSchema),
  CouresControllar.updateCorseDb
);

export const CouresRauter = router;
