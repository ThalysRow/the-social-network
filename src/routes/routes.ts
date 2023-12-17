import { Router } from "express";
const router = Router();

router.get("/", () => {
  console.log("Hello, world!");
});

export default router;
