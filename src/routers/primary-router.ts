import { Router } from "express";
import customerRequest from "../controllers/customerRequest";
import waitForSomeTime from "../controllers/waitForSomeTime";

const primaryRouter = Router({ mergeParams: true });

primaryRouter.post("/customerRequest", customerRequest);
primaryRouter.post("/wait", waitForSomeTime);

export default primaryRouter;
