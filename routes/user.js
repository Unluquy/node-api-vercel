const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');


// router.get('/:id', async function(req,res){
//     try {
//         const sqlQuery = 'SELECT id, email, password, created_at FROM user WHERE id=?';
//         const rows = await pool.query(sqlQuery, req.params.id);
//         res.status(200).json(rows);
//     } catch (error) {
//         res.status(400).send(error.message)
//     }


//     res.status(200).json({id:req.params.id})
// });

router.post('/register', async function(req,res) {
    try {
        const {username, password} = req.body;

        
        
        const encryptedPassword = await bcrypt.hash(password,10)

        const sqlQuery = 'INSERT INTO users (username, password) VALUES (?,?)';
        const result = await pool.query(sqlQuery, [username, encryptedPassword]);

        res.status(200).json({userId: result.insertId.toString()});
    } catch (error) {
        
        res.status(400).send(error.message)
    }
})

router.post('/login', async function(req,res) {
    try {
        const {identifiant,password} = req.body;


        const sqlGetUser = 'SELECT password FROM users WHERE username=?';
        const rows = await pool.query(sqlGetUser,identifiant);
        if(rows){
            
            const isValid = await bcrypt.compare(password,rows[0].password)
            
            if (isValid) {
                res.status(200).json({valid_password: isValid});
            }
            else {
                res.status(404).send("Username or password invalid")
            }
            
        }else {
            res.status(404).send(`User was not found`);
        }
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;