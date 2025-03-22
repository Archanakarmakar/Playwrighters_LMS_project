/** Generated from: tests/Features/005_Class/003_AddNewClassPopup.feature */
import { test } from "playwright-bdd";

test.describe("Add New Class popup", () => {

  test.beforeEach(async ({ Given }) => {
    await Given("Admin is on the Manage class page after login");
  });

  test.describe("Check if class is created when only mandatory fields are entered with valid data", () => {

    test("Example #1", { tag: ["@addNewClassPopup", "@Class_AddNewClassPopup_Validation", "@ClassTC_012"] }, async ({ Given, When, Then }) => {
      await Given("Admin is on the Class Popup window");
      await When("Admin enters mandatory fields in the form and clicks on save button from \"validInput\" and \"Class\"");
      await Then("Admin gets message Class added Successfully");
    });

  });

  test("Check no of classes value added when selecting class dates", { tag: ["@addNewClassPopup", "@Class_AddNewClassPopup_Validation", "@ClassTC_013"] }, async ({ Given, When, Then }) => {
    await Given("Admin is on the Class Popup window");
    await When("Admin selects class date in date picker");
    await Then("Admin should see no of class value is added automatically");
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("tests/Features/005_Class/003_AddNewClassPopup.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
});

const bddFileMeta = {
  "Check if class is created when only mandatory fields are entered with valid data|Example #1": {"pickleLocation":"15:1","tags":["@addNewClassPopup","@Class_AddNewClassPopup_Validation","@ClassTC_012"]},
  "Check no of classes value added when selecting class dates": {"pickleLocation":"18:1","tags":["@addNewClassPopup","@Class_AddNewClassPopup_Validation","@ClassTC_013"],"ownTags":["@ClassTC_013","@Class_AddNewClassPopup_Validation"]},
};