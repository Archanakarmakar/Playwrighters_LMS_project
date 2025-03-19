@Batch
Feature: Batch page Validations
Background: Admin is already logged in
Given Admin is on the home Page

Scenario: Verify Admin Navigate to Batch page successfully
When Admin Clicks on the Batch menu from the header
Then  Admin should be in the Manage Batch Page

#Scenario: Validate "Title" in Batch Page
#Given Admin is on the home page
#When Admin Clicks on the Batch menu from the header
#Then  Admin should see the "LMS-Learning Management System" Title

#Scenario: Validate "heading" in the Batch Page
#When Admin Clicks on the Batch menu from the header
#Then Admin should see the "Manage Batch" Heading

#Scenario: Validate disabled "Delete Icon" under the header in the Batch Page 
#When Admin Clicks on the Batch menu from the header
#Then Admin should see the disabled "Delete Icon" under the header

#Scenario: Validate pagination in the Batch Page 
#When Admin Clicks on the Batch menu from the header
#Then Admin should see the enabled pagination controls under the data table

#Scenario: Validate edit icon in each data rows 
 #When Admin Clicks on the Batch menu from the header
 #Then Admin should see the edit icon in each row


#Scenario: validate delete icon in each data rows
#When Admin Clicks on the Batch menu from the header
#Then Admin should see the delete icon in each row


#Scenario: validate checkbox in each data rows
#When Admin Clicks on the Batch menu from the header
#Then Admin should see the checkbox in each row


#Scenario: Validate Datatable headers
#When Admin Clicks on the Batch menu from the header
#Then Admin should see the datatable headers Batch name, Batch Description,Batch Status, No Of classes, Program Name, Edit/Delete


#Scenario: Validate "Checkbox" in the Datatable header row
#When Admin Clicks on the Batch menu from the header
#Then Admin should see the checkbox  in the datatable header row


 #Scenario: Validate "sort icon" next to all the datatable header
 #When Admin Clicks on the Batch menu from the header
 #Then Admin should see the sort icon next to all Datatable headers


#Scenario: Verify sub menu displayed in batch menu bar in batch page
#When Admin clicks "Batch" on the navigation bar
#Then Admin should see sub menu in menu bar as "Add New Batch"


 #Scenario: Validate Admin able to click on the Add new Batch Option in batch page
 #When Admin clicks on "Add New batch" under the "batch" menu bar
 #Then Admin should see the Batch Details pop up window

 #Scenario: Validate all the fields exist in new batch pop up 
 #When Admin checks all the fields are enabled
 #Then The pop up should include the fields Batch Name,Number of classes and Description as text box,Program Name as drop down,Status as radio button

 #Scenario:Validate batchname prefix selected program name in new batch pop up
 #When Admin selects program name present in the dropdown
 #Then Admin should see selected program name in the batch name prefix box

 #Scenario:Validate batch name suffix box should accept only numbers in new batch pop up
 #When Admin enters alphabets in batch name suffix box
 #Then Admin should get error message below the text box of respective field


 #Scenario: Validate batch name prefix box is not editable in new batch pop up
 #When Admin enters alphabets in batch name prefix box
 #Then Admin should see empty text box

 #Scenario: Validate input data only for mandatory fields in new batch pop up
 #When Admin enters the data only to the mandatory fields and clicks save button
 #Then Admin should get a successful message

 #Scenario:Validate input data missing for mandatory fields in new batch pop up  
 #When Admin leaves blank one of the mandatory fields
 #Then Admin should get a error message on the respective mandatory field

 #Scenario: validate save button in Batch details pop up
 #When Admin enters the valid data to all the mandatory fields and click save button 
 #Then Admin should get a successful message


 #Scenario: validate cancel button in Batch details pop up
 #When Admin enters the valid data to all the mandatory fields and click cancel button 
 #Then Admin can see the batch details popup closes without creating any batch

 #Scenario:validate close icon on the batch details pop up
 #When Admin clicks on the close icon
 #Then batch details pop up closes


 #Scenario:Validate Edit icon feature in any row
 #When Admin clicks the edit icon
 #Then Admin should see the Batch details pop up window

 #Scenario:Validate program name  value is disabled to edit
 #When Admin clicks the edit icon
 #Then Admin should see Program name value field is disabled for editing

 #Scenario:Validate batch name  value is disabled to edit
 #When Admin clicks the edit icon
 #Then Admin should see batch name value field is disabled for editing


 #Scenario: Validate editing description and No. of classes fields with invalid data in the pop up
 #When Admin Updates any fields with invalid data and click save button
 #Then Admin should get a error message under the respective field


 #Scenario:validate save button in Batch details pop up in batch details page
 #When Admin enters the valid data to all the mandatory fields and click save button 
 #Then Admin should get a successful message for editing the batch

 #Scenario:validate cancel button in Batch details pop up in batch details page
 #When Admin enters the valid data to all the mandatory fields and click cancel button 
 #Then Admin can see the batch details popup closes without editing the batch

 #Scenario:validate delete Icon on any row in batch page
 #When Admin clicks the delete Icon on any row
 #Then Admin should see the confirm alert box with yes and no button

 #Scenario:Validate yes button on the confirm alert box in batch confirm pop up page
 #When Admin clicks on the delete icon and click yes button
 #Then Admin should see the successful message and the batch should be deleted

 #Scenario:validate no button on the confirm alert box in batch confirm pop up page
 #When Admin clicks on the delete icon and click no button
 #Then Admin should see the alert box closed and the batch is not deleted

# Scenario:validate close Icon on the alert box in batch confirm pop up page
 #When Admin clicks on the close icon
 #Then Admin should see the alert box closed 

 #Scenario:Validate single row delete with checkbox
 #When Admin clicks on the delete icon under the Manage batch header
 #Then The respective row in the table should be deleted

 #Scenario:Validate multiple row delete with checkbox
 #When Admin clicks on the delete icon under the Manage batch header
 #Then The respective row in the table should be deleted

 #Scenario:Validate next page link
 #When Admin clicks next page link on the data table
 #Then Admin should see the Next enabled link

 #Scenario:validate last page link
 #When Admin clicks last page link on the data table
 #Then Admin should see the last page link with next page link disabled on the table 

 #Scenario:validate the previous page link
 #When Admin clicks previous page link on the data table
 #Then Admin should see the previous page on the table

 #Scenario: validate the first page link
 #When Admin clicks first page link on the data table
 #Then Admin should see the very first page on the data table

 Scenario:validate search box functionality
 When Admin enters the batch name in the search text box
 Then Admin should see the filtered batches in the data table

 Scenario:Validate logout option in the header is visible and enabled from the batch page
 When Admin clicks on the logout button
 Then Admin should see the Login screen Page












