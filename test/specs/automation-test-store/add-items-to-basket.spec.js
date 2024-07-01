import HomePage from "../../pageobjects/automation-test-store/home.page";
import SkinCarePage from "../../pageobjects/automation-test-store/skincare.page";

describe('Add items to basket', () => {

    beforeEach(async () => {
        
        //await browser.url("https://automationteststore.com/");
        await HomePage.open();
    });

    it("Add specific 'skincare produts' to basket and validate car total", async() => {

        //const skincareLinks = await $$("//a[contains(text(), 'Skincare')]");
        //await skincareLinks[1].click();
        await HomePage.categoryMenuComponent.categoryMenuLink('Skincare')[1].click();

        //const skincareProducts_Header_Links = await $$('.fixed_wrapper .prdocutname');
        const skincareProducts_Header_Links = await SkinCarePage.itemComponent.itemHeaderLinks;

        await SkinCarePage.addSpecificItems_ValidateTotal("creme precieuse nuit 50ml","total moisture facial cream");

        //creme precieuse nuit 50ml
        //total moisture facial cream

        //await browser.pause(3000);

        
    });
});