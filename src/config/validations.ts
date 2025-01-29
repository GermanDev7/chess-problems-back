import * as Joi from 'joi';

export const validationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(), // 🔥 Exige que JWT_SECRET esté definido
  MONGODB_URI: Joi.string().required(),
  PORT: Joi.number().default(3000), // Si PORT no está, usa 3000
});