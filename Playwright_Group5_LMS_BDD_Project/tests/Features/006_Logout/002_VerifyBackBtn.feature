 
Feature:Validation on Logout button
        Background:
                Given Admin is logged out of the application
        Scenario:Verify back button function
                Given Admin is in login Page
                When Admin clicks  browser back button
                Then Admin should receive error message