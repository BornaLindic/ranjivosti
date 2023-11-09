import express from 'express';
import {getStudentData} from '../db/queries'

const router = express.Router()
let att = 'shhhhhhhhhh'
let csfrEnabled = false

router.get('/', function (req, res) {
    res.render('index', {att: att,
                         csfrEnabled: csfrEnabled});
  });


router.post('/injection', async function (req, res) {
  if (!req.body.injection) {
    if(/^\w+$/.test(req.body.name)) {
      console.log('Checked for injection and input is safe!');
    } else {
      res.render('index', {att: att,
                            csfrEnabled: csfrEnabled,
                            err: 'Invalid input!'})
      return
    }

  }

  let data;
  try {
    data = await(getStudentData(req.body.name));
  } catch (e) {
    console.log(e);
    res.render('index', {att: att,
                         csfrEnabled: csfrEnabled,
                         err: 'Invalid input!'})
    return
  }
  res.render('index', {att: att,
                       csfrEnabled: csfrEnabled,
                       data: JSON.stringify(data.rows)});
});


router.get('/csrf', function (req, res) {
  if (req.query.att && typeof(req.query.att) === 'string' && csfrEnabled) {
    att = req.query.att
  }
  res.render('index', {att: att, csfrEnabled: csfrEnabled});
});


router.post('/csrf', function (req, res) {
  if (req.body.att && typeof(req.query.att) === 'string') {
    att = req.query.att
  }
  res.render('index', {att: att, csfrEnabled: csfrEnabled});
});


router.post('/csrfEnable', function (req, res) {
  if (req.body.csrfEnabled) {
    csfrEnabled = true
  } else {
    csfrEnabled = false
  }
  res.render('index', {att: att, csfrEnabled: csfrEnabled});
});


router.get('/csrfImage', function (req, res) {
  res.render('csrfImage');
});

export {router as homeRouter};