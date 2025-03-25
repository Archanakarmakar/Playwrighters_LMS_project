@sortClass
Feature: Sort Class details

Background: Admin is on the Manage Class page after login
Given Admin is on the Manage class page after login

@SortClassValidation @ClassTC_028
Scenario: Sort Class by Batch name
Given Admin is on the Manage class page
When Admin clicks on the Batchname sort icon
Then Admin should see Class details are sorted by Batch Name

@SortClassValidation @ClassTC_029
Scenario: Sort Class by Class topic
Given Admin is on the Manage class page
When Admin clicks on the Class topic sort icon
Then Admin should see Class details are sorted by Class Topic

@SortClassValidation @ClassTC_030
Scenario: Sort Class by Class Description
Given Admin is on the Manage class page
When Admin clicks on the Class description sort icon
Then Admin should see Class details are sorted by Class Description

@SortClassValidation @ClassTC_031
Scenario: Sort Class by Status
Given Admin is on the Manage class page
When Admin clicks on the Status sort icon
Then Admin should see Class details are sorted by Status

@SortClassValidation @ClassTC_032
Scenario: Sort Class by Class date
Given Admin is on the Manage class page
When Admin clicks on the Class Date sort icon
Then Admin should see Class details are sorted by Class Date

@SortClassValidation @ClassTC_033
Scenario: Sort Class by staff name
Given Admin is on the Manage class page
When Admin clicks on the Staff Name sort icon
Then Admin should see Class details are sorted by Staff name


