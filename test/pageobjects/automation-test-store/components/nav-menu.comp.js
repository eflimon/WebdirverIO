class NavMenuComponent {
        NavMenuLink(linkText){
            return $("//span[text()='"+ linkText +"']");
        }
}
export default new NavMenuComponent();