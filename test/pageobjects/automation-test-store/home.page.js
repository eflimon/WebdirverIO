import BasePage from "./base.page";
import CategoryMenuComponent from "../automation-test-store/components/category-menu.comp";
import NavigationMenuComponent from "../automation-test-store/components/nav-menu.comp";

class HomePage extends BasePage{
    open(){
        return super.open("");
    }

    get categoryMenuComponent() {
        return CategoryMenuComponent;
    }

    get navigationMenuComponent(){
        return NavigationMenuComponent;
    }
}

export default new HomePage();