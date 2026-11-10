import { Locator, Page } from "@playwright/test";
import { BasePage as BasePage } from "./basePage";

export class HomePage extends BasePage {

    readonly entitiesMenuItem: Locator
    readonly entityMenu: Locator


    constructor(page: Page) {
        super(page)
        this.entitiesMenuItem = page.getByText('Entities')
        this.entityMenu = page.locator('#entity-menu > div')
    }

    async openEntities() {
        await this.entitiesMenuItem.click()
        await this.selectGroupMenuItem('Category')
        await this.waitForNumberOfSeonds(3)
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const isHidden = await this.entityMenu.getAttribute('area-hidden')
        if (isHidden == 'true') {
            await groupMenuItem.click()
        }
    }
}