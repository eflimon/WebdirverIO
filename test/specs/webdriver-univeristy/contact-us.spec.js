import allureReporter from "@wdio/allure-reporter";
import ContactUsPage from "../../pageobjects/webdriver-university/contact-us.page";


describe('webdriveruniversity - contact us page', function() {

    //this.retries(1); // Retry all test in this suite up to one times

    beforeEach(async () => {

        //await browser.url('/Contact-Us/contactus.html');
        await ContactUsPage.open();
        //console.log(`>>Browser Object: + ${JSON.stringify(browser)}`);
        
        //Lines to run the test in a different environment
        //console.log("CONFIG ENV: " + browser.config.environment);
        //console.log("CONFIG EMAIL: " + browser.config.email);
        //console.log("CONFIG FIRST NAME: " + browser.config.firstName);
        //console.log("CONFIG PASSWORD: " + browser.config.password);
        //console.log("CONFIG BASE URL: " + browser.config.baseUrl);

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

        //ContactUsPage.submitForm("Joe","Blogs");
        ContactUsPage.submitForm_UsingRandomdata("Joe","Blogs");
        //ContactUsPage.submitForm_UsingRandomdata(browser.config.firstName,"Blogs");

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

    it('invalid submission - do not submit all information', async() => {

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

    it('Submit just first name', async () => {

        //await browser.url('/Contact-Us/contactus.html');
        //const firstNameTextField = $("[name='first_name']");
    
        ContactUsPage.submitForm("Dave","","","");

        await expect(ContactUsPage.unsucessfulSubmissionHeader).toHaveText(
            expect.stringContaining('Error: all fields are required')
        );
        await expect(ContactUsPage.unsucessfulSubmissionHeader).toHaveText(
            expect.stringContaining('Error: Invalid email address')
        );
        //await firstNameTextField.clearValue();        
    });

    it('Submit just last name', async () => {

        ContactUsPage.submitForm("","Grohl","","");

        await expect(ContactUsPage.unsucessfulSubmissionHeader).toHaveText(
            expect.stringContaining('Error: all fields are required')
        );
        await expect(ContactUsPage.unsucessfulSubmissionHeader).toHaveText(
            expect.stringContaining('Error: Invalid email address')
        );        
    });

    it('Submit just message', async () => {

        ContactUsPage.submitForm("","","","Test message");

        await expect(ContactUsPage.unsucessfulSubmissionHeader).toHaveText(
            expect.stringContaining('Error: all fields are required')
        );
        await expect(ContactUsPage.unsucessfulSubmissionHeader).toHaveText(
            expect.stringContaining('Error: Invalid email address')
        );        
    });

    it('Submit just email', async () => {

        ContactUsPage.submitForm("","","test@email.com","");

        await expect(ContactUsPage.unsucessfulSubmissionHeader).toHaveText(
            expect.stringContaining('Error: all fields are required')
        );       
    });

})