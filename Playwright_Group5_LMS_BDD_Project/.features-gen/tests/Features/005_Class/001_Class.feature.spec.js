/** Generated from: tests/Features/005_Class/001_Class.feature */
import { test } from "playwright-bdd";

test.describe("Class Page Validation", () => {

  test.beforeEach(async ({ Given }) => {
    await Given("Admin is on the home page after login");
  });

  test("Validating the class manage page", { tag: ["@class", "@ClassPageValidation", "@ClassTC_001"] }, async ({ Given, When, Then }) => {
    await Given("Admin is on the home page after login");
    await When("Admin clicks the Class Navigation bar in the Header");
    await Then("Admin should land on the \" Manage Class\" page");
  });

  test("Validating the Title in the Manage class page", { tag: ["@class", "@ClassPageValidation", "@ClassTC_002"] }, async ({ Given, When, Then }) => {
    await Given("Admin is on the home page after login");
    await When("Admin clicks the Class Navigation bar in the Header");
    await Then("Admin should see the \" LMS - Learning Management System \" Title");
  });

  test("Validating the Header in the Manage class page", { tag: ["@class", "@ClassPageValidation", "@ClassTC_003"] }, async ({ Given, When, Then }) => {
    await Given("Admin is on the home page after login");
    await When("Admin clicks the Class Navigation bar in the Header");
    await Then("Admin should see the \" Manage Class\" Header");
  });

  test("Validating Search bar in class page", { tag: ["@class", "@ClassPageValidation", "@ClassTC_004"] }, async ({ Given, When, Then }) => {
    await Given("Admin is on the home page after login");
    await When("Admin clicks the Class Navigation bar in the Header");
    await Then("Admin should see the Search Bar in Manage class page");
  });

  test.describe("Validating the data table headers in the class page", () => {

    test("Example #1", { tag: ["@class", "@ClassPageValidation", "@ClassTC_005"] }, async ({ Given, When, Then }) => {
      await Given("Admin is on the home page after login");
      await When("Admin clicks the Class Navigation bar in the Header");
      await Then("Admin should see the datatable heading like \"Batch Name, Class Topic, Class Description, Status, Class Date, Staff Name, Edit / Delete\"");
    });

  });

  test("Validating the text and pagination icon in the classpage", { tag: ["@class", "@ClassPageValidation", "@ClassTC_006"] }, async ({ Given, When, Then }) => {
    await Given("Admin is on the home page after login");
    await When("Admin clicks the Class Navigation bar in the Header");
    await Then("Admin should see the  showing x to y of  z entries and enabled pagination controls under the data table");
  });

  test("Validate the sort icon of all the field in datatable", { tag: ["@class", "@ClassPageValidation", "@ClassTC_007"] }, async ({ Given, When, Then }) => {
    await Given("Admin is on the home page after login");
    await When("Admin clicks the Class Navigation bar in the Header");
    await Then("Admin should see the Sort icon of all the field in the datatable.");
  });

  test("Validating the Delete button under the Manage class", { tag: ["@class", "@ClassPageValidation", "@ClassTC_008"] }, async ({ Given, When, Then }) => {
    await Given("Admin is on the home page after login");
    await When("Admin clicks the Class Navigation bar in the Header");
    await Then("Admin should see the Delete button under the Manage class page header.");
  });

  test("Validate the total no of classes in manage class page", { tag: ["@class", "@ClassPageValidation", "@ClassTC_009"] }, async ({ Given, When, Then }) => {
    await Given("Admin is on the home page after login");
    await When("Admin clicks the Class Navigation bar in the Header");
    await Then("Admin should see Total no of classes in below of the data table.");
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("tests/Features/005_Class/001_Class.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
});

const bddFileMeta = {
  "Validating the class manage page": {"pickleLocation":"8:1","tags":["@class","@ClassPageValidation","@ClassTC_001"],"ownTags":["@ClassTC_001","@ClassPageValidation"]},
  "Validating the Title in the Manage class page": {"pickleLocation":"14:1","tags":["@class","@ClassPageValidation","@ClassTC_002"],"ownTags":["@ClassTC_002","@ClassPageValidation"]},
  "Validating the Header in the Manage class page": {"pickleLocation":"20:1","tags":["@class","@ClassPageValidation","@ClassTC_003"],"ownTags":["@ClassTC_003","@ClassPageValidation"]},
  "Validating Search bar in class page": {"pickleLocation":"26:1","tags":["@class","@ClassPageValidation","@ClassTC_004"],"ownTags":["@ClassTC_004","@ClassPageValidation"]},
  "Validating the data table headers in the class page|Example #1": {"pickleLocation":"39:2","tags":["@class","@ClassPageValidation","@ClassTC_005"]},
  "Validating the text and pagination icon in the classpage": {"pickleLocation":"42:1","tags":["@class","@ClassPageValidation","@ClassTC_006"],"ownTags":["@ClassTC_006","@ClassPageValidation"]},
  "Validate the sort icon of all the field in datatable": {"pickleLocation":"48:1","tags":["@class","@ClassPageValidation","@ClassTC_007"],"ownTags":["@ClassTC_007","@ClassPageValidation"]},
  "Validating the Delete button under the Manage class": {"pickleLocation":"54:1","tags":["@class","@ClassPageValidation","@ClassTC_008"],"ownTags":["@ClassTC_008","@ClassPageValidation"]},
  "Validate the total no of classes in manage class page": {"pickleLocation":"60:1","tags":["@class","@ClassPageValidation","@ClassTC_009"],"ownTags":["@ClassTC_009","@ClassPageValidation"]},
};