import { Router } from 'express';
import { BookController } from '../controllers/bookController';
import { validateRequest } from '../middleware/validator';
import { createBookSchema, updateBookSchema } from '../validators/bookValidator';

const router = Router();
const bookController = new BookController();

router.post('/', validateRequest(createBookSchema), bookController.createBook.bind(bookController));
router.get('/', bookController.getBooks.bind(bookController));
router.get('/:id', bookController.getBookById.bind(bookController));
router.put('/:id', validateRequest(updateBookSchema), bookController.updateBook.bind(bookController));
router.delete('/:id', bookController.deleteBook.bind(bookController));

export default router;  