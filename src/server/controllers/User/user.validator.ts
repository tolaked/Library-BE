import Joi from '@hapi/joi';
import { JoiValidator } from '@app/data/util';

export const isUser = Joi.object({
  email_address: JoiValidator.validateString()
});
