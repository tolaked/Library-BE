import Joi from '@hapi/joi';
import { JoiValidator } from '@app/data/util';

export const isUser = Joi.object({
  password: JoiValidator.validateString().required(),
  email_address: JoiValidator.validateString().required(),
});
