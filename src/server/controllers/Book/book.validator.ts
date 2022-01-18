import Joi from '@hapi/joi';
import { JoiValidator } from '@app/data/util';

export const isBook = Joi.object({
  title: JoiValidator.validateString().required(),
  img_url: JoiValidator.validateString().required()
});

export const isID = Joi.object({
  id: JoiValidator.validateID()
});
