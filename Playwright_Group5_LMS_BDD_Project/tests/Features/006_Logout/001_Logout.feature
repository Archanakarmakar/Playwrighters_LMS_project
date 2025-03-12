 @logout
Feature: Validation on Logout button
    Background:
        Given Admin is logged in to LMS Portal
 @logo
    Scenario:Verify logout function
        Given Admin is on dashboard page after Login
        When Admin clicks on the logout in the menu bar
        Then Admin should be redirected to login page

    