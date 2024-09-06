import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Middleware to validate user input for the sign-up route
export const validateSignUp = [
  // Check username
  body('username')
    .trim()
    .isLength({ max: 20 })
    .withMessage('Käyttäjänimi ei voi olla pidempi kuin 20 merkkiä')
    .notEmpty()
    .withMessage('Käyttäjänimi ei voi olla tyhjä'),

  // Check description
  body('description')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Kuvaus ei voi olla pidempi kuin 100 merkkiä'),

  // Check email format
  body('email')
    .trim()
    .isEmail()
    .withMessage('Sähköpostiosoite ei ole kelvollinen'),

  // Check password strength
  body('password')
    .trim()
    .isLength({ min: 8, max: 50 })
    .withMessage('Salasanan on oltava vähintään 8 merkkiä ja enintään 50 merkkiä pitkä')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/)
    .withMessage('Salasanan on sisällettävä isoja ja pieniä kirjaimia, numeroita ja erikoismerkkejä'),

  // Handle validation result
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return error response if validation fails
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // If validation passes, proceed to the next middleware/route handler
  },
];

export const validateLogin = [
    // Check email format
    body('email')
      .trim()
      .isEmail()
      .withMessage('Sähköpostiosoite ei ole kelvollinen')
      .notEmpty()
      .withMessage('Sähköposti on pakollinen'),
  
    // Check password
    body('password')
      .trim()
      .isLength({ min: 8, max: 50 })
      .withMessage('Salasanan on oltava vähintään 8 merkkiä ja enintään 50 merkkiä pitkä')
      .notEmpty()
      .withMessage('Salasana on pakollinen'),
  
    // Handle validation result
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Return error response if validation fails
        return res.status(400).json({ errors: errors.array() });
      }
      next(); // If validation passes, proceed to the next middleware/route handler
    },
  ];
