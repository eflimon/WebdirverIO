import homePage from "../../pageobjects/automation-test-store/home.page";

describe('Add items to basket', () => {

    beforeEach(async () => {
        
        //await browser.url("https://automationteststore.com/");
        await homePage.open();
    });

    it("Add specific 'skincare produts' to basket and validate car total", async() => {

        const skincareLinks = await $$("//a[contains(text(), 'Skincare')]");
        const itemPrices = [];
        await skincareLinks[1].click();

        const skincareProducts_Header_Links = await $$('.fixed_wrapper .prdocutname');
        for (const header of skincareProducts_Header_Links) {

            const tempHeaderText = await header.getText();
                        
            if(tempHeaderText.toLowerCase() == "creme precieuse nuit 50ml" ||
            tempHeaderText.toLowerCase() == "total moisture facial cream"){

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

        await $("//span[text()='Cart']").click();
        await expect(browser).toHaveUrlContaining("checkout");

        // //span[text()='Flat Shipping Rate:']/../following-sibling::td
        var tempShippingRate = await $("//span[text()='Flat Shipping Rate:']/../following-sibling::td").getText();
        var shippingRate = tempShippingRate.replace('$','');

        itemsTotal = itemsTotal + parseFloat(shippingRate);
        console.log("Items total + shipping rate = " + itemsTotal);

        // extract cart total
        var cartTotal = await $("//span[text()='Total:']/../following-sibling::td").getText();
        cartTotal = cartTotal.replace('$','');

        expect(itemsTotal).toEqual(parseFloat(cartTotal));

        await browser.pause(3000);

        
    });
});