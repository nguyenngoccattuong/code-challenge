import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/bookService';
import { NotFoundError, BadRequestError } from '../utils/errors';

const bookService = new BookService();

export class BookController {
  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await bookService.createBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      next(new BadRequestError('Failed to create book'));
    }
  }

  async getBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = req.query;
      const books = await bookService.getBooks(filters);
      res.json(books);
    } catch (error) {
      next(new BadRequestError('Failed to fetch books'));
    }
  }

  async getBookById(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await bookService.getBookById(req.params.id);
      if (!book) throw new NotFoundError('Book not found');
      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await bookService.updateBook(req.params.id, req.body);
      if (!book) throw new NotFoundError('Book not found');
      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await bookService.deleteBook(req.params.id);
      if (!book) throw new NotFoundError('Book not found');
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
} 