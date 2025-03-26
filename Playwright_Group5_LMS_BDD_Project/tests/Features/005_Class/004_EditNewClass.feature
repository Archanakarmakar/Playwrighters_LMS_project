@editNewClass
Feature: Edit New class

Background: Admin is on the Manage Class page after login
Given Admin is on the Manage class page after login

@EditClassValidation @ClassTC_019
Scenario: Validate row level edit icon
Given Admin is on the Manage class page
When Admin clicks on the edit icon 
Then A new pop up with class details appears 

@EditClassValidation @ClassTC_020
Scenario: Check disabled  batch name
Given Admin is on the Manage class page
When Admin clicks on the edit icon 
Then Admin should see batch name field is disabled

@EditClassValidation @ClassTC_021
Scenario: Check disabled class topic
Given Admin is on the Manage class page
When Admin clicks on the edit icon
Then Admin should see class topic field is disabled 

@EditClassValidation @ClassTC_022
Scenario Outline: Check if the fields are updated with valid data
Given Admin is on the Edit Class Popup window
When Update the fields with valid "<KeyOption>" data from excel "<SheetName>"  and click save
Then Admin gets message "SuccessfulClass Updated" and see the updated values in data table

Examples:
| KeyOption         |   SheetName  |
| ValidEditData     |   Class      |

#Bug
# Scenario Outline: Check if the fields are updated with invalid values  
# Given Admin is on the Edit Class Popup window
# When Update the fields with invalid "<KeyOption>" data from excel "<SheetName>" and click save
# Then Admin should get Error message 

#  Examples:
#  |  KeyOption          |   SheetName    |
#  | InValidData         |   Class        |

# @EditClassValidation @ClassTC_024
# #Bug - Without updating, Successful Updated message getting 
# Scenario Outline: Check if the mandatory fields are updated with valid data
# Given Admin is on the Edit Class Popup window
# When Update the mandatory fields with valid "<KeyOption>" data from excel "<SheetName>"and click save
# Then Admin gets message "SuccessfulClass Updated" and see the updated values in data table

# Examples:
#  |  KeyOption                 |   SheetName    |
#  |  MandatoryValid            |   Class        |

@EditClassValidation @ClassTC_025
Scenario Outline: Check if the optional fields are updated with valid data
Given Admin is on the Edit Class Popup window
When Update the optional fields with valid "<KeyOption>" data from excel "<SheetName>" and click save
Then Admin gets message "SuccessfulClass Updated"  and see "<KeyOption>" and "<SheetName>" the updated values in data table

Examples:
| KeyOption                  |   SheetName        |
|  OptionalValid             |   Class        |

#Bug
@EditClassValidation @ClassTC_026
Scenario Outline: Validate invalid values in the text fields   
Given Admin is on the Edit Class Popup window
When Admin enters only numbers or special char in the text fields for "<KeyOption>" data from excel "<SheetName>"
Then Admin should get Error message 

Examples:
| KeyOption                        |   SheetName    |
| NumericOrAlphaData               |   Class        |

@EditClassValidation @ClassTC_027
Scenario: Validate Cancel button on Edit popup
Given Admin is on the Edit Class Popup window
When Admin clicks Cancel button on edit popup
Then Admin can see the class details popup disappears and can see nothing changed for particular Class







