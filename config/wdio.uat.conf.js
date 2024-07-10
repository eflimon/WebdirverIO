import {config as baseConfig} from "../wdio.conf"

export const config = Object.assign(baseConfig, {
    environment: "TEST",
    email: "autotest1@gmail.com",
    firtName: "Sarah",
    password: "pass1",
    //this url should be another environment URL
    baseUrl: "https://automationteststore.com"
})