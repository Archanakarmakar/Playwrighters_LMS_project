@Batch
Feature:Pagination in Batch page Validations
Background: Admin is on the batch page
Given Admin is on the batch page

Scenario:Validate next page link
 When Admin clicks next page link on the data table
 Then Admin should see the Next enabled link

 Scenario:validate last page link
 When Admin clicks last page link on the data table
 Then Admin should see the last page link with next page link disabled on the table 

 Scenario:validate the previous page link
 When Admin clicks previous page link on the data table
 Then Admin should see the previous page on the table

 Scenario: validate the first page link
 When Admin clicks first page link on the data table
 Then Admin should see the very first page on the data table