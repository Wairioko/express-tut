import { Router } from 'express';
import { query, validationResult } from 'express-validator';
import { users } from '../constants.mjs';
import { User } from './schema/user.mjs';
import { checkSchema } from 'express-validator';
import { passwordHash } from '../utils/helpers.mjs';
import { createUserValidationSchema } from '../utils/validation-schema.mjs';


const router = Router();

router.post('/api/users', checkSchema(createUserValidationSchema) ,async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) return res.send(res.array())
    const { body } = req;
    try {
        
        const hashedPassword = passwordHash(body.password);
        const new_user = new User({ ...body, password: hashedPassword });
        const saved_user = await new_user.save();
        console.log(saved_user)
        return res.status(201).send(saved_user);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
});

router.get('/api/users', 
    query('filter').optional().isString(),
    query('value').optional().isString(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { filter, value } = req.query;
        if (!filter || !value) {
            return res.status(200).send(users);
        }
        const filteredUsers = users.filter(user => user[filter] && user[filter].includes(value));
        return res.status(200).send(filteredUsers);
    }
);

export default router;
