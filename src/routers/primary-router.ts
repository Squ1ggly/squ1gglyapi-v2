import { Router } from "express";
import customerRequest from "../controllers/customerRequest";

const primaryRouter = Router({ mergeParams: true });

primaryRouter.post("/customerRequest", customerRequest);

export default primaryRouter;
