import { Router } from "express";
import { query, validationResult } from "express-validator";
import { users } from "../constants.mjs"

const router = Router();



router.get("/api/users", query("filter").optional().isString(),
query("value").optional().isString(),
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
})


export default router;