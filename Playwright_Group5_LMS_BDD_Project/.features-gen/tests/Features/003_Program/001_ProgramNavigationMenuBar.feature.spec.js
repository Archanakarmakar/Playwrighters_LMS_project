/** Generated from: tests/Features/003_Program/001_ProgramNavigationMenuBar.feature */
import { test } from "playwright-bdd";

test.describe("Program Navigation & MenuBar", () => {

  test.beforeEach(async ({ Given, page }) => {
    await Given("Admin is logged in to LMS Portal", null, { page });
  });

  test("Verify that Admin is able to navigate to Program module", async ({ Given, page, When, Then }) => {
    await Given("Admin is on home page after Login", null, { page });
    await When("Admin clicks Program on the navigation bar", null, { page });
    await Then("Admin should be navigated to Program module", null, { page });
  });

  test("Verify Logout displayed in menu bar", async ({ Given, page, When, Then }) => {
    await Given("Admin is on home page after Login", null, { page });
    await When("Admin clicks Program on the navigation bar", null, { page });
    await Then("Admin should see Logout in menu bar", null, { page });
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("tests/Features/003_Program/001_ProgramNavigationMenuBar.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
});

const bddFileMeta = {
  "Verify that Admin is able to navigate to Program module": {"pickleLocation":"6:5"},
  "Verify Logout displayed in menu bar": {"pickleLocation":"11:5"},
};