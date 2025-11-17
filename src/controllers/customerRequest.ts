import { NextFunction, Response, Request } from "express";
import { ISiteStub, RAPIDAPIHelper } from "../util/rapidHelper";

export default async function customerRequest(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const secret = process.env.HCAPTCHA_SECRET;

        const token = req.headers["x-capcha-token"] as string;

        const formData = new URLSearchParams();
        formData.append("response", token ?? "");
        formData.append("secret", secret ?? "");

        const verifyRes = await fetch("https://hcaptcha.com/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
        });

        const data = await verifyRes.json();

        if (!data.success) {
            return res
                .status(400)
                .json({ message: "hCaptcha verification failed", data });
        }

        const siteStub: ISiteStub = {
            environment: "test",
            tenant: "squ1gglyzerocool",
            site: "family",
        };

        const rapidHelper = new RAPIDAPIHelper(
            siteStub,
            process.env.CLIENT_ID ?? "",
            process.env.CLIENT_SECRET ?? "",
        );

        await rapidHelper.createItem(
            "Website Requests",
            JSON.stringify({
                email: req.body?.email,
                plan: req.body?.plan || "No plan",
                description: req.body?.description ?? "",
            }),
        );

        return res.json({ message: "hCaptcha verification succeeded" });
    } catch (error: any) {
        console.log(error?.message ?? "");
        next("An unexptected error occured");
        return;
    }
}
