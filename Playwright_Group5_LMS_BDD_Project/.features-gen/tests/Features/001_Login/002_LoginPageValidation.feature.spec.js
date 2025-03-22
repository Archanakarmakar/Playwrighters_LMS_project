/** Generated from: tests/Features/001_Login/002_LoginPageValidation.feature */
import { test } from "playwright-bdd";

test.describe("Login page Validations", () => {

  test.beforeEach(async ({ Given }) => {
    await Given("Admin launch the browser");
  });

  test("Verify Admin is able to land on login page", async ({ When, Then }) => {
    await When("Admin gives the correct LMS portal URL");
    await Then("Admin should land on the login page");
  });

  test("Verify Admin is able to land on home page with invalid URL", async ({ Given, When, Then }) => {
    await Given("Admin launch the browser");
    await When("Admin gives the invalid LMS portal URL");
    await Then("Admin should recieve application error");
  });

  test("Verify for broken link", async ({ When, Then }) => {
    await When("Admin gives the correct LMS portal URL");
    await Then("HTTP response >= 400. Then the link is broken");
  });

  test("Verify the text spelling in the page", async ({ When, Then }) => {
    await When("Admin gives the correct LMS portal URL");
    await Then("Admin should see correct spellings in all fields");
  });

  test("Verify application name", async ({ When, Then }) => {
    await When("Admin gives the correct LMS portal URL");
    await Then("Admin should see  LMS - Learning Management System");
  });

  test("Validate sign in content", async ({ When, Then }) => {
    await When("Admin gives the correct LMS portal URL");
    await Then("Admin should see \"Please login to LMS application\"");
  });

  test("Verify text field is present", async ({ When, Then }) => {
    await When("Admin gives the correct LMS portal URL");
    await Then("Admin should see two text field");
  });

  test("Verify text on the first text field", async ({ When, Then }) => {
    await When("Admin gives the correct LMS portal URL");
    await Then("Admin should \"User\" in the first text field");
  });

  test("Verify text on the second text field", async ({ When, Then }) => {
    await When("Admin gives the correct LMS portal URL");
    await Then("Admin should \"Password\" in the second text field");
  });

  test("verify Login button is present", async ({ When, Then }) => {
    await When("Admin gives the correct LMS portal URL");
    await Then("Admin should see login button");
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("tests/Features/001_Login/002_LoginPageValidation.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
});

const bddFileMeta = {
  "Verify Admin is able to land on login page": {"pickleLocation":"6:1"},
  "Verify Admin is able to land on home page with invalid URL": {"pickleLocation":"10:1"},
  "Verify for broken link": {"pickleLocation":"15:1"},
  "Verify the text spelling in the page": {"pickleLocation":"19:1"},
  "Verify application name": {"pickleLocation":"23:1"},
  "Validate sign in content": {"pickleLocation":"32:1"},
  "Verify text field is present": {"pickleLocation":"37:1"},
  "Verify text on the first text field": {"pickleLocation":"42:1"},
  "Verify text on the second text field": {"pickleLocation":"46:1"},
  "verify Login button is present": {"pickleLocation":"55:1"},
};