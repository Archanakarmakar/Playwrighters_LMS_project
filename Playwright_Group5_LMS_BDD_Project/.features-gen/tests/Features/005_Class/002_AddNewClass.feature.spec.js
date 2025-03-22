/** Generated from: tests/Features/005_Class/002_AddNewClass.feature */
import { test } from "playwright-bdd";

test.describe("Add New Class", () => {

  test.beforeEach(async ({ Given }) => {
    await Given("Admin is on the Manage class page after login");
  });

  test("Validate Class Details Popup window", { tag: ["@addNewClass", "@Class_AddNewClass_Validation", "@ClassTC_010"] }, async ({ Given, When, Then }) => {
    await Given("Admin is on the Manage class page");
    await When("Admin clicks a add new class under the class menu bar.");
    await Then("Admin should see a popup open for class details with empty form along with SAVE and CANCEL button and Close(X) Icon on the top right corner of the window");
  });

  test("Validate input fields and their text boxes in Class details form", { tag: ["@addNewClass", "@Class_AddNewClass_Validation", "@ClassTC_011"] }, async ({ Given, When, Then }) => {
    await Given("Admin is on the Manage class page");
    await When("Admin clicks a add new class under the class menu bar.");
    await Then("Admin should see few input fields and their respective text boxes in the class details window");
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("tests/Features/005_Class/002_AddNewClass.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
});

const bddFileMeta = {
  "Validate Class Details Popup window": {"pickleLocation":"8:1","tags":["@addNewClass","@Class_AddNewClass_Validation","@ClassTC_010"],"ownTags":["@ClassTC_010","@Class_AddNewClass_Validation"]},
  "Validate input fields and their text boxes in Class details form": {"pickleLocation":"14:1","tags":["@addNewClass","@Class_AddNewClass_Validation","@ClassTC_011"],"ownTags":["@ClassTC_011","@Class_AddNewClass_Validation"]},
};