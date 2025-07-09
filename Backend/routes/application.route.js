import express from "express";
import {applyJob, getAppliedJobs, getApplicants, updateStatus} from "../controllers/application.contoller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

//u will get router from express

const router=express.Router();

router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);

export default router;

