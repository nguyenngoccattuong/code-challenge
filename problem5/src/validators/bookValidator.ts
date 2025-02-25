import Joi from 'joi';

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  price: Joi.number().min(0).required(),
  publishedYear: Joi.number().min(1800).max(2024).required()
});

export const updateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  price: Joi.number().min(0),
  publishedYear: Joi.number().min(1800).max(2024)
}).min(1); 