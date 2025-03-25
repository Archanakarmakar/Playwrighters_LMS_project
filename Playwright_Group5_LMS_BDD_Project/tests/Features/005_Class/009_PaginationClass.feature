@classPagination
Feature: Pagination

Background: Admin is on the Manage Class page after login
Given Admin is on the Manage class page after login

@PaginationClassValidation @ClassTC_045
Scenario: Verify Next page link(>)
Given Admin is on the Manage class page
When Admin clicks Next page link on the class table 
Then Admin should see the next page record on the table with Pagination has next active link enabled

@PaginationClassValidation @ClassTC_046
Scenario: Verify Last page link(>>)
Given Admin is on the Manage class page
When Admin clicks Next page link on the class table 
When Admin clicks Last page link
Then Admin should see the last page record on the table with Next page link are disabled

@PaginationClassValidation @ClassTC_047
Scenario: Verify Previous page link(<)
Given Admin is on the Manage class page and clicks on last page link
Given Admin is on last page of class table
When Admin clicks Previous page link
Then Admin should see the previous page record on the table with pagination has previous page link enabled

@PaginationClassValidation @ClassTC_048
Scenario: Verify First page link(<<)
Given Admin is on the Manage class page and clicks on Previous page link
Given Admin is on Previous class page 
When Admin clicks First page link
Then Admin should see the very first page record on the table with Previous page link are disabled
 