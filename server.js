import express from 'express';
import {connection} from './db.js';
import path from 'path';

import multer from 'multer';
//import { storage,x } from './app.js'; // Import the modular upload routes
import { ProcessData } from './mon.js';
import { router as productRouter } from './routes.js';

connection;

const app=express();

let x;

// Set the storage destination and filename for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    x = file.originalname;
    
  },
});
const upload = multer({ storage });
app.use(express.static('public'));
app.use(express.static('uploads'));

const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + 'public/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server and API app is running on port ${PORT}`);


app.use('/', productRouter);

  app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
      
    }
    else{
      res.send('File uploaded successfully');
        ProcessData(x);
    }
  });



});


