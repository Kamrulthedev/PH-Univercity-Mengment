import express from "express";
import { AdminControllar } from "./admin.controllar";
import validationRequest from "../../milddlerwer/validate.Request";
import { AdminValidationSchema } from "./admin.validation";

const router = express.Router();

router.get("/", AdminControllar.getAllAdmin);

router.get("/:id", AdminControllar.getSingelAdmin);

router.patch(
  "/:id",
  validationRequest(AdminValidationSchema.updateAdminValidationSchema),
  AdminControllar.updateAdminDb,
);

router.delete("/:id", AdminControllar.deleteAdminDb);

export const AdminRouter = router;
