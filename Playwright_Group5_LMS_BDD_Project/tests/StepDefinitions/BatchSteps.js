import { createBdd } from "playwright-bdd";
const { Given, When, Then } = createBdd();
const { POManager } = require("../PageObject/POManager");
const { expect } = require("@playwright/test");
const { getDataByKeyOption } = require("../Utilities/ExcelUtils"); // Import the function
let batch_Page;
let reusablepage;
