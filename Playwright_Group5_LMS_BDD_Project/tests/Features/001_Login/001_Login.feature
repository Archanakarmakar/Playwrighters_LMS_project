@login
Feature:Login Page Verification

Background: 
Given Admin launch the browser

Scenario Outline: Validate login with valid credentials
Given Admin is in login Page
When Admin enter valid username and password from excel file for the scenario "<KeyOption>" and clicks login button 
Then Admin should land on dashboard page.  

Examples:
|   KeyOption        |
|   ValidCredential  |

Scenario Outline: Validate login with invalid credentials
Given Admin is in login Page
When Admin enter invalid credentials from excel file for the Scenario "<KeyOption>" and clicks login button 
Then Admin should receive an error message

Examples:
|   KeyOption                   |
|   InvalidCredential         |



Scenario Outline: Validate login credentials with null Adminname
Given Admin is in login Page
When Admin enter value only in password for the "<KeyOption>" from the exceland clicks login button 
Then Admin should receive an error message for null userName
Examples:
|   KeyOption                   |
|   InValidNullUsername         |

Scenario Outline: Validate login credentials with null password
Given Admin is in login Page
When Admin enter value only in adminname for the "<KeyOption>" from the excel and clicks login button 
Then Admin should receive an error message for null password
Examples:
|   KeyOption                   |
|   InValidNullPassword         |

Scenario Outline: Validate login credentials with null userName and password
Given Admin is in login Page
When Admin try to login leaving adminname and password blank for the "<KeyOption>" from the excel and clicks login button 
Then Admin should receive an error message for the InValidEmptyUserAndPassword
Examples:
|   KeyOption                           |
|   InValidEmptyUserAndPassword         |

# Scenario Outline: Validate login with valid credentials
# Given Admin is in login Page
# When Admin enter valid "<userName>" and "<password>" and clicks login button 
# Then Admin should land on dashboard page.  

# Examples:
# |   userName                    |   password        |
# |   playwrightuser@gmail.com    |   Playwright@1234 |
