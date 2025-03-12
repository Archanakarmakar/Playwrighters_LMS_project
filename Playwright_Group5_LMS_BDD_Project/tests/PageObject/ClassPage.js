const { ReusablePage } = require('./ReusablePage');
const { TIMEOUT } = require('dns');
const { getDataByKeyOption } = require('../Utilities/ExcelUtils'); 
const filepath = 'tests/TestData/PlayWright_Group5_Data.xlsx';
const { expect } =require('@playwright/test');
 
require('dotenv').config();

class ClassPage{
   
 
}

module.exports = {ClassPage}