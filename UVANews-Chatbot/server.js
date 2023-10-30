import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import * as sshClient from './sshClient.js'

const app = express();
app.use(cors());
app.use(express.json());



app.post('/query', async (req, res) => {
  try {
    const sshUsername = process.env.SSH_USERNAME;
    const sshPass = process.env.SSH_PASS;
    const query = req.body.query;
    const exePath = `${process.env.SERVER_EXE_PATH}query_vector_store.py`

    let response = null;

    response = await sshClient.getQuery(sshUsername, sshPass, query, exePath);


    res.send({"modelAnswer": response})
  } catch (error) {
    console.error(error)
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

app.post('/update', async (req, res) => {
  try {
    const sshUsername = process.env.SSH_USERNAME;
    const sshPass = process.env.SSH_PASS;
    const exePath = `${process.env.SERVER_EXE_PATH}update_vector_store.py`
    let response = null;

    response = await sshClient.update(sshUsername, sshPass, exePath);

    res.send({"mostRecentDate": response});
  } catch (error) {
    console.error(error)
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});



app.listen(8080, () => console.log('server is up'));

