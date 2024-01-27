import { Router } from 'express'
import { linearRouter } from '../controller/linear.controller';

export const router = Router();

router.use('/linear', linearRouter)

