const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const {check, validationResult} = require('express-validator');

// @route   GET api/visites/
// @desc    Get all visites
// @access  Public
router.get('/', async (req, res) => {
   
    try {
        const sqlQuery = 'SELECT * FROM visites';
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    } 
});

// @route   GET api/visites/showcase
// @desc    Get visites for the cities
// @access  Public
router.get('/showcase', async (req, res) => {
   
    try {
        const sqlQuery = 'SELECT * FROM visites GROUP BY ville ORDER BY creation';
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);

    } catch (error) {
        res.status(200).send(error);
        console.log(error);
    } 
});

// @route   GET api/visites/:id
// @desc    Get a visite
// @access  Public
router.get('/:id', async (req, res) => {
   
    try {

        const sqlQuery = 'SELECT * FROM visites where id = ?';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    } 
});



// @route   POST api/visites
// @desc    Create a visite
// @access  Admin
router.post('/', [
    check('name', 'Veuillez renseigner un nom').notEmpty(),
    check('jours', 'Veuillez renseigner un jour').notEmpty(),
    check('mois', 'Veuillez renseigner un mois').notEmpty(),
    check('heures', 'Veuillez renseigner une heure').notEmpty(),
    check('depart', 'Veuillez renseigner un depart').notEmpty(),
    check('distance', 'Veuillez renseigner une distance').notEmpty(),
    check('desc', 'Veuillez renseigner une description').notEmpty(),
    check('diff', 'Veuillez renseigner une difficulte').notEmpty(),
    check('duree', 'Veuillez renseigner un duree valide').matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])$/)
],async (req, res) => {
    try{
        const {name, jours, mois, heures, depart, duree, distance, diff, desc} = req.body
        const values = {
            id: null, 
            name: name, 
            jours: jours, 
            mois: mois, 
            heures: heures, 
            depart:depart, 
            duree:duree, 
            distance:distance, 
            diff: diff ? diff : 0, 
            desc:desc,
            creation: null
        }
        console.log(req.body);
        const rows = await pool.query({
             namedPlaceholders:true, 
             sql:'INSERT INTO visites VALUES (:id, :name, :jours, :mois, :heures, :depart, :duree, :distance, :diff, :desc, :creation)'}, 
             values);
         res.status(200).json({id: rows.insertId.toString()});
            //res.status(200).json(values);
     
    }  catch (error) {
        res.status(400).send(error);
        console.log(error);
    } 
});

module.exports = router;