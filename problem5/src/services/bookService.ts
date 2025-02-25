import Book, { IBook } from '../models/book';

export class BookService {
  async createBook(bookData: Partial<IBook>): Promise<IBook> {
    const book = new Book(bookData);
    return await book.save();
  }

  async getBooks(filters: any = {}): Promise<IBook[]> {
    const query: any = {};
    
    if (filters.author) {
      query.author = new RegExp(filters.author, 'i');
    }
    
    if (filters.year) {
      query.publishedYear = filters.year;
    }

    return await Book.find(query);
  }

  async getBookById(id: string): Promise<IBook | null> {
    return await Book.findById(id);
  }

  async updateBook(id: string, bookData: Partial<IBook>): Promise<IBook | null> {
    return await Book.findByIdAndUpdate(id, bookData, { new: true });
  }

  async deleteBook(id: string): Promise<IBook | null> {
    return await Book.findByIdAndDelete(id);
  }
} 