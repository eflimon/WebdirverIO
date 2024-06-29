module.exports = {

    waitThenClick: async function (element){

        console.log(`>> Executing command: waitThenClick, against elemnt ${JSON.stringify(element)}`);
        await element.waitForExist();
        await element.waitForDisplayed();
        await element.click();

    }

}