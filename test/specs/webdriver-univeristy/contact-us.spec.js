import allureReporter from "@wdio/allure-reporter";
import ContactUsPage from "../../pageobjects/webdriver-university/contact-us.page";
import contactUsPage from "../../pageobjects/webdriver-university/contact-us.page";


describe('webdriveruniversity - contact us page', function() {

    //this.retries(1); // Retry all test in this suite up to one times

    beforeEach(async () => {

        //await browser.url('/Contact-Us/contactus.html');
        await ContactUsPage.open();
        console.log(`>>Browser Object: + ${JSON.stringify(browser)}`);

    })

    it('Valid submission - submit all information', async function() {

        //this.retries(2);

        allureReporter.addFeature("Constact up page - valid submission");
        allureReporter.addDescription("Validate constact us page by submitting all data");
        allureReporter.addSeverity("critical");

        //first name
        //const firstName = await $('//*[@name="first_name"]');
        //last name
        //const lastName = await $('//*[@name="last_name"]');
        //email address
        //const emailAddress = await $('//*[@name="email"]');
        //message
        //const message = await $('//*[@name="message"]');
        //submit button
        //const submitButton = await $('//input[@value="SUBMIT"]');

        //await firstName.setValue("Joe");
        //await lastName.setValue("Blogs");
        //await emailAddress.setValue("joe_blogs@test.com");
        //await message.setValue("Hello how are you?");

        ContactUsPage.submitForm("Joe","Blogs","joe_blogs@test.com", "Hello how are you?");

        //await browser.debug();
        //await submitButton.click();
        //await browser.waitThenClick(submitButton);

        //const successfulSubmissionheader = $('#contact_reply > h1');
        //console.log(`successfulSubmissionHeader Element: ` + JSON.stringify(await successfulSubmissionheader));
        await expect(ContactUsPage.successfulSubmissionheader).toHaveText('Thank You for your Message!');

        
        //jest assertion
        //const successfulSubmissionheader2 = (await $('#contact_reply > h1')).getText();
        //await expect (successfulSubmissionheader2).toEqual('Thank You for your Message!')

    })

    it('invalid submission - don submit all information', async() => {

        allureReporter.addFeature("Constact up page - invalid submission");
        allureReporter.addDescription("Validate constact us page by not submitting all data");
        allureReporter.addSeverity("normal");
        
        //first name
        //const firstName = await $('//*[@name="first_name"]');

        //last name
        //const lastName = await $('//*[@name="last_name"]');

        //message
        //const message = await $('//*[@name="message"]');

        //submit button
        //const submitButton = await $('//input[@value="SUBMIT"]');

        //await firstName.setValue("Jose");
        //await lastName.setValue("Perez");
        //await message.setValue('Hello World!!!');
        //await submitButton.click();

        ContactUsPage.submitForm("Joe","Blogs","", "Hello how are you?");

        //const unsucessfulSubmissionHeader = $('body');
        await expect(ContactUsPage.unsucessfulSubmissionHeader).toHaveTextContaining(['Error: all fields are required',' Error: Invalid email address']);


    })

    it('only type a first name', async () => {
        ContactUsPage.submitForm("Joe");
        await expect(ContactUsPage.unsucessfulSubmissionHeader).toHaveTextContaining(['Error: all fields are required',' Error: Invalid email address']);
        
    });


})