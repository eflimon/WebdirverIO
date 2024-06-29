describe('wait commands - examples', () => {

    beforeEach(async () => {

        await browser.url("/Ajax-Loader/index.html");
        
    });

    it('pause command', async () => {

        const clickMe_Button = await $("//*[text()='CLICK ME!']/..");

        await browser.pause(10000);
        await clickMe_Button.click();
        await browser.pause(1500);
        
    });

    it('waitforclickable', async () => {

        const clickMe_Button = await $("#button1");
        //await clickMe_Button.waitForClickable({timeout: 3000});
        await clickMe_Button.waitForClickable();
        await clickMe_Button.click();
        await browser.pause(1500);

    });

    it('waitForDisplayed', async () => {

        const clickMe_Button = await $("#button1");
        await clickMe_Button.waitForDisplayed();
        await clickMe_Button.click();
        
    });

    it('waitForExist', async () => {

        const clickMe_Button = await $("#button1");
        await clickMe_Button.waitForExist();
        
    });

    it('waitUntil', async () => {

        await browser.url("/Accordion/index.html");
        const loadingStatus = await $("#text-appear-box");

        await loadingStatus.waitUntil(async function (){
            return (await this.getText())==='LOADING COMPLETE.'
        },
        {
            timeout:15000,
            timeoutMsg: 'expected text to be different after 15 seconds'
        })
        
    });

});