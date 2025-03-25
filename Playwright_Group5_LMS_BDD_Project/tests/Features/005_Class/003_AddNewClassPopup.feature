@addNewClassPopup
Feature: Add New Class popup

Background: Admin Is on the Manage class page after login
Given Admin is on the Manage class page after login

@Class_AddNewClassPopup_Validation @ClassTC_012
Scenario Outline: Check if class is created when only mandatory fields are entered with valid data
Given Admin is on the Class Popup window
When Admin enters mandatory fields in the form and clicks on save button from "<KeyOption>" and "<sheetName>"
Then Admin gets message Class added Successfully 

Examples:
|KeyOption|sheetName|
|validInput|Class|

@Class_AddNewClassPopup_Validation @ClassTC_013
Scenario: Check no of classes value added when selecting class dates
Given Admin is on the Class Popup window
When Admin selects class date in date picker
Then Admin should see no of class value is added automatically

@Class_AddNewClassPopup_Validation @ClassTC_014
Scenario: Check weekend dates are disabled in calendar
Given Admin is on the Class Popup window
When Admin clicks date picker
Then Admin should see weekends dates are disabled to select

@Class_AddNewClassPopup_Validation @ClassTC_015
Scenario Outline: Check if class is created when only optional fields are entered with valid data
Given Admin is on the Class Popup window
When Admin skips to add value in mandatory field and enter only the optional field from "<KeyOption>" and "<sheetName>"
Then Admin should see error message below the test field and the field will be highlighted in red color

Examples:
|KeyOption|sheetName|
|validInput|Class|

# @Class_AddNewClassPopup_Validation @ClassTC_016  ------BUG
# Scenario: check if class is created when invalid data is entered in all of the fields
# Given Admin is on the Class Popup window
# When Admin enters invalid data in all of the fields in the form and clicks on save button
# Then Admin gets error message and class is not created

@Class_AddNewClassPopup_Validation @ClassTC_017
Scenario: Empty form submission
Given Admin is on the Class Popup window
When Admin clicks on save button without entering data 
Then class won't be created and Admin gets error message

@Class_AddNewClassPopup_Validation @ClassTC_018
Scenario: Validate Cancel/Close(X) icon on class Details form
Given Admin is on the Class Popup window
When Admin clicks Cancel/Close(X) Icon on Class Details form
Then Class Details popup window should be closed without saving
