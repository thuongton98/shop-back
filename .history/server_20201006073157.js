const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

var bodyParser = require('')