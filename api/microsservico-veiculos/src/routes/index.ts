import { Router } from "express";
import veiculoRouter from "./veiculoRouter";


const router = Router();

router.use('/',veiculoRouter)

export default router