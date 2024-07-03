import BasePage from "./base.page";
import dataGenereator from "../../../utils/data-genereator";

class ContactUsPage extends BasePage{
    open() {
        return super.open("Contact-Us/contactus.html");
    }

    get inputFirstName(){
        return $('//*[@name="first_name"]');
    }

    get inputLastName(){
        return $('//*[@name="last_name"]');
    }

    get inputEmail(){
        return $('//*[@name="email"]');
    }

    get inputMessage(){
        return $('//*[@name="message"]');
    }

    get submitButton(){
        return $('//input[@value="SUBMIT"]');
    }

    get successfulSubmissionheader() {
        return $('#contact_reply > h1');
    }
    
    get unsucessfulSubmissionHeader () {
        return $('body');
    }

    async submitForm(firstName, LastName, email, message){
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(LastName);
        await this.inputMessage.setValue(message);
        await this.inputEmail.setValue(email);
        await this.submitButton.click();
    }

    async submitForm_UsingRandomdata(firstName, LastName){
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(LastName);
        await this.inputMessage.setValue("Random Message:S " + dataGenereator.generateRandomString());
        await this.inputEmail.setValue("AutoEmail_" + dataGenereator.generateRandomString() + "@gmail.com");
        await this.submitButton.click();

    }
}
export default new ContactUsPage();