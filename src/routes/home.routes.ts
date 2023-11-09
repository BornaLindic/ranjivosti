import express from 'express';
import {getStudentData} from '../db/queries'

const router = express.Router()

router.get('/', function (req, res) {
    res.render('index');
  });


  router.post('/injection', async function (req, res) {
    if (!req.body.injection) {
      if(/^\w+$/.test(req.body.name)) {
        console.log('Checked for injection and input is safe!');
      } else {
        res.render('index', {err: 'Invalid input!'})
        return
      }

    }

    let data;
    try {
      data = await(getStudentData(req.body.name));
    } catch (e) {
      console.log(e);
      res.render('index', {err: 'Invalid input!'})
      return
    }
    res.render('index', {data: JSON.stringify(data.rows)});
  });

export {router as homeRouter};