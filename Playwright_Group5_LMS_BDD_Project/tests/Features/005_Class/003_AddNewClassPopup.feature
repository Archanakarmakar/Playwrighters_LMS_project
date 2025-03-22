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
