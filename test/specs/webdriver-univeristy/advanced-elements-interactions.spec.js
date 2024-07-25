import AllureReporter from "@wdio/allure-reporter";
import ContactUsPage from "../../pageobjects/webdriver-university/contact-us.page";
import contactUsPage from "../../pageobjects/webdriver-university/contact-us.page";

describe('advanced element interactions - examples', () => {

    it('inputs', async () => {
        //await browser.url("/Contact-Us/contactus.html");
        //const firstNameTextField = $("[name='first_name']");

        await contactUsPage.open();

        //You can also use unicode characters like Left arrow or Back spaces:
        //https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions
        //Doesn’t Clear element before typing:
        //https://webdriver.io/docs/api/element/addValue
        contactUsPage.inputFirstName.addValue("Add your text here ");
        contactUsPage.inputLastName.addValue("My added text");

        //await firstNameTextField.addValue("Add your text here ");
        //await firstNameTextField.addValue("My added text");
        //await browser.pause(2000);

        //Send a sequence of key strokes to an element (clears element before typing)
        //Keyword: clears before typing:
        //https://webdriver.io/docs/api/element/setValue
        contactUsPage.inputFirstName.setValue("Hello how are you?");
        //await browser.pause(2000);

        //Clear a <textarea> or text <input> element’s value:
        //https://webdriver.io/docs/api/element/clearValue
        contactUsPage.inputFirstName.clearValue();
        //await browser.pause(2000);
    });

    it('drop-down', async () => {

        await browser.url('/Dropdown-Checkboxes-RadioButtons/index.html')
        const programminLanguage = await $('#dropdowm-menu-1');
        await programminLanguage.selectByAttribute('value','python');
        await expect(programminLanguage).toHaveValueContaining('python');
        await browser.pause(2000);

        const tech_DropDownList = await $('#dropdowm-menu-2');
        await tech_DropDownList.selectByIndex(2);
        await expect (tech_DropDownList).toHaveValueContaining('TestNG', {ignoreCase: true});
        await browser.pause(2000);

        const frontEndLanguage_DropDownList = await $('#dropdowm-menu-3');
        await frontEndLanguage_DropDownList.selectByVisibleText('CSS');
        await expect(frontEndLanguage_DropDownList).toHaveValueContaining('CSS', {ignoreCase: true});
        await browser.pause(2000);
        
    });

    it('state commands', async () => {

        await browser.url('/Dropdown-Checkboxes-RadioButtons/index.html')

        const lettuceRadioButton = await $('[value="lettuce"]');
        const lettuceRadioButton_isDisplayed = await lettuceRadioButton.isDisplayed();
        await expect(lettuceRadioButton_isDisplayed).toEqual(true);
        await expect(lettuceRadioButton).toBeEnabled();

        const lettuceRadioButton_isCliackble = await lettuceRadioButton.isClickable();
        await expect(lettuceRadioButton_isCliackble).toEqual(true);

        const cabbageRadioButton = await $('[value="cabbage"]');
        const cabbageRadioButton_isEnabled = await cabbageRadioButton.isEnabled();
        await expect(cabbageRadioButton_isEnabled).toEqual(false);
        await expect(cabbageRadioButton).toBeDisabled();
        
    });

    it('actions', async () => {

        await browser.url("/Actions/index.html");

        //drag and drop
        const elem = await $('#draggable');
        const target = await $('#droppable');
        await elem.dragAndDrop(target);
        await browser.pause(3000);

        //double click
        const doubleClick_button = await $('#double-click')
        await doubleClick_button.doubleClick();
        await browser.pause(3000);

        //mouse over
        await $("//button[text()='Hover Over Me First!']").moveTo();
        const firstLink = await $("(//*[text()='Link 1'])[1]");
        firstLink.waitForClickable();
        firstLink.click();
        await browser.pause(3000);

        
    });


    it('handling windows', async () => {

        await browser.url("https://www.webdriveruniversity.com");
        await browser.newWindow("https://www.automationteststore.com/");

        let currentWindow_Title = await browser.getTitle();
        console.log(`>>Current Window Tite: ${currentWindow_Title}`);
        await expect(browser).toHaveUrlContaining('automationteststore');
        //await browser.pause(3000);

        await browser.switchWindow('https://www.webdriveruniversity.com');
        let parentWindow_Title = await browser.getTitle();
        console.log(`>>Parent Window Title: ${parentWindow_Title}`);
        await expect(browser).toHaveUrlContaining('webdriveruniversity.com');
        //await browser.pause(3000);

        await $('#contact-us').click();
        await browser.switchWindow('automationteststore');
        await browser.closeWindow();
        await browser.switchWindow('contactus');
        await browser.closeWindow();
        await browser.switchWindow('webdriveruni');
        console.log(await browser.getTitle());

        await browser.pause(3000);                
    });

    it('Iframes', async() => {

        await browser.url("/IFrame/index.html");
        const iframe = await $('#frame');
        await browser.switchToFrame(iframe);
        await $("//a[text()='Our Products']").click();
        //await browser.pause(3000);
        await browser.switchToParentFrame();

        await browser.pause(3000);        
    });

    it('alerts', async() => {

        await browser.url("/Popup-Alerts/index.html");
        await $('#button1').click();
        await browser.acceptAlert();

        await $('#button4').click();
        const alertText = await browser.getAlertText();
        await expect(alertText).toEqual('Press a button!');

        await browser.acceptAlert();
        await expect($('#confirm-alert-text')).toHaveText('You pressed OK!');

        await $('#button4').click();
        await browser.dismissAlert();
        await expect($('#confirm-alert-text')).toHaveText('You pressed Cancel!');

        await browser.pause(3000);
        
    });

    it('Files upload', async() => {

        await browser.url("/File-Upload/index.html");        
        await $('#myFile').addValue(`${process.cwd()}\\Data\\dummy_file.txt`)
        await $('#submit-button').click();
        const alertText = await browser.getAlertText();
        await expect(alertText).toEqual('Your file has now been uploaded!');
        await browser.acceptAlert();

        await browser.pause(3000);
        
    });

    it('JS execute', async() => {

        await browser.url("/Hidden-Elements/index.html");
        await browser.execute(() => {

            return document.getElementById("not-displayed").setAttribute("id", "");

        });
        await browser.execute(() => {

            return document.body.style.backgroundColor = "tomato"
        });


        await browser.pause(3000); 
        
    });
});