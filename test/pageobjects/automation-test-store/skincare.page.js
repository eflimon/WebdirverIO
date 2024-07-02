import BasePage from "./base.page";
import ItemComponent from "../automation-test-store/components/item.comp";
import HomePage from "../../pageobjects/automation-test-store/home.page";
import CartPage from "../automation-test-store/cart.page"

class SkinCarePage extends BasePage{
    get itemComponent(){
        return ItemComponent;
    }

    async addSpecificItems_ValidateTotal(item1, item2){
        const skincareProducts_Header_Links = await ItemComponent.itemHeaderLinks;

        const itemPrices = [];

        for (const header of skincareProducts_Header_Links) {

            const tempHeaderText = await header.getText();
                        
            if(tempHeaderText.toLowerCase() == item1.toLowerCase() ||
            tempHeaderText.toLowerCase() == item2.toLowerCase()){

                const attr = await header.getAttribute("href");
                //console.log(attr);
                const itemId = attr.split("id=").pop(); // 93 66
                //console.log(itemId);

                // //a[@data-id="93"]
                await $('//a[@data-id="' + itemId + '"]').click();

                // //a[@data-id="93"]/following-sibling::div/div[@class='pricenew']|//a[@data-id="66"]/following-sibling::div/div[@class='oneprice']
                itemPrices.push(
                    await $("//a[@data-id='" + itemId + "']/following-sibling::div/div[@class='pricenew']"
                        + "|//a[@data-id='" + itemId + "']/following-sibling::div/div[@class='oneprice']").getText()
                )

            }
            
        }

        const formattedItemPrices = [];

        itemPrices.forEach ((price) => {

            formattedItemPrices.push(price.replace("$",""));

        });

        var itemsTotal = 0;
        formattedItemPrices.forEach(price => itemsTotal += parseFloat(price));
        console.log("Items total: " + itemsTotal);


        //await $("//span[text()='Cart']").click();
        await HomePage.navigationMenuComponent.NavMenuLink('Cart').click();
        await expect(browser).toHaveUrlContaining("checkout");

        // //span[text()='Flat Shipping Rate:']/../following-sibling::td
        //var tempShippingRate = await $("//span[text()='Flat Shipping Rate:']/../following-sibling::td").getText();
        var tempShippingRate = await CartPage.shippingRate.getText();
        var shippingRate = tempShippingRate.replace('$','');

        itemsTotal = itemsTotal + parseFloat(shippingRate);
        console.log("Items total + shipping rate = " + itemsTotal);

        // extract cart total
        //var cartTotal = await $("//span[text()='Total:']/../following-sibling::td").getText();
        var cartTotal = await CartPage.total.getText();
        cartTotal = cartTotal.replace('$','');

        expect(itemsTotal).toEqual(parseFloat(cartTotal));
    }
}
export default new SkinCarePage();