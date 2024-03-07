import { Router } from 'express';
import BlogController from './../controller/blog.mjs';

const router = Router();

router.get('/', BlogController.blog_list);
router.post('/add', BlogController.blog_create);
router.put('/update/:id', BlogController.blog_update);
router.delete('/delete/:id', BlogController.blog_delete);

export default router;