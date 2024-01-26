import { Router } from 'express'
import { linearRouter } from '../controller/linear.controller';
import { middlewareAuth } from '../utils/middlewareAuth';

export const router = Router();

router.use('/linear', middlewareAuth, linearRouter)

