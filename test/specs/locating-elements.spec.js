describe('locating elements', () => {

    beforeEach(async() => {

         await browser.url('https://selectors.webdriveruniversity.com/');

    })

    it('$ - locate element', async() => {        

        await browser.$("//a[@href='#portfolio']").click();
        await browser.pause(3000);

        const webdriverButton = await $('[data-target="#portfolioModal1"]');
        await webdriverButton.click();

    });

    it('$$ - locate elements', async () => {

        const expectedTitles = [
            "#",
            "First",
            "Last",
            "Handle",
            "1",
            "2",
            "3",
            "Firstname",
            "Lastname",
            "Age"
        ]

        const actualTitle = [];

        const tableHeaderTitles = await $$('//table//th');

        for (const title of tableHeaderTitles){

            //console.log(await title.getText());
            actualTitle.push(await title.getText());

        }

        expect(expectedTitles).toEqual(actualTitle);

    });
});