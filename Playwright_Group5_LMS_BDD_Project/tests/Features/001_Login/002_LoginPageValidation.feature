Feature: Login page Validations

Background: Admin launches the browser
Given Admin launch the browser

Scenario: Verify Admin is able to land on login page
When Admin gives the correct LMS portal URL
Then Admin should land on the login page 

Scenario: Verify Admin is able to land on home page with invalid URL
Given Admin launch the browser
When Admin gives the invalid LMS portal URL
Then Admin should recieve application error

Scenario: Verify for broken link
When Admin gives the correct LMS portal URL
Then HTTP response >= 400. Then the link is broken

Scenario: Verify the text spelling in the page 
When Admin gives the correct LMS portal URL
Then Admin should see correct spellings in all fields 

Scenario: Verify application name 
When Admin gives the correct LMS portal URL
Then Admin should see  LMS - Learning Management System 

# Scenario: Verify company name 
# When Admin gives the correct LMS portal URL
# Then Admin should see company name below the app name


Scenario: Validate sign in content
When Admin gives the correct LMS portal URL
Then Admin should see "Please login to LMS application"


Scenario: Verify text field is present
When Admin gives the correct LMS portal URL
Then Admin should see two text field


Scenario: Verify text on the first text field
When Admin gives the correct LMS portal URL
Then Admin should "User" in the first text field

Scenario: Verify text on the second text field
When Admin gives the correct LMS portal URL
Then Admin should "Password" in the second text field

# Scenario: Verify the alignment input field for the login
# When Admin gives the correct LMS portal URL
# Then Admin should see input field on the centre of the page


Scenario: verify Login button is present
When Admin gives the correct LMS portal URL
Then Admin should see login button 


# Scenario: Verify input descriptive test in Admin field
# When Admin gives the correct LMS portal URL
# Then Admin should see Admin in gray color

# Scenario: Verify input descriptive test in password field
# When Admin gives the correct LMS portal URL
# Then Admin should see password in gray color

