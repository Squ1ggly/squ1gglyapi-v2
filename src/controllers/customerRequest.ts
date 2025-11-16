import { NextFunction, Response, Request } from "express";

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

        if (data.success) {
            return res.json({ message: "hCaptcha verification succeeded" });
        }

        return res
            .status(400)
            .json({ message: "hCaptcha verification failed", data });
    } catch (error) {
        next("An unexptected error occured");
        return;
    }
}
