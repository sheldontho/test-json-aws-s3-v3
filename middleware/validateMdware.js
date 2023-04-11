/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
  try {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    let extractedErrors = [];
    errors.array().map((err) => extractedErrors.push(err.msg));
    console.log('MDWARE_validate_422:', errors);
    return res.status(422).json({
      errors: extractedErrors
    });
  } catch (e) {
    console.log('MDWARE_validate_ERROR:', e);
    next(e);
  }
};

export { validate };
