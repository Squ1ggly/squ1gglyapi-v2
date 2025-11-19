import { NextFunction, Response, Request } from "express";

export default async function waitForSomeTime(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const body = Number(req.query["time"]);
        if (isNaN(body)) {
            res.status(400).send("time was not a number");
            return;
        }

        if (body > 500000) {
            res.status(400).send("Out of range 1-500000");
            return;
        }

        const time = body * 1000;

        const sleep = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));

        await sleep(time);

        res.status(200).send(`Completed waiting for ${body} seconds`);
        return;
    } catch (error) {
        next(error);
        return;
    }
}
