import express from "express";
import validationRequest from "../../milddlerwer/validate.Request";
import { AcademicDerpermentValidation } from "./academicDerperment.validaotion";
import { AcademicDepermantControllar } from "./academicDeperment.controllar";

const router = express.Router();

router.post(
  "/create-academic-deperment",
//   validationRequest(
//     AcademicDerpermentValidation.createAcademicDapermentValidation
//   ),
  AcademicDepermantControllar.createAcademicDerpermentDb
);

//get all academic deperment
router.get("/", AcademicDepermantControllar.getAllACademicDeperment);

//get a single derperment
router.get("/:id", AcademicDepermantControllar.getSingleAcademicDeperment);

//update academic deperment
router.patch("/:id", AcademicDepermantControllar.updateAcademicDeperment);

export const AcademicDepermantRouter = router;
