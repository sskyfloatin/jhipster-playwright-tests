import { Locator, Page } from "@playwright/test";

export class HomePage  {
    readonly page: Page
    readonly entitiesMenuItem: Locator
    readonly entityMenu: Locator
    


    constructor(page: Page) {
        this.entitiesMenuItem = page.getByText('Entities')
        this.entityMenu = page.locator('#entity-menu > div')
    }

    async openEntities() {
        await this.entitiesMenuItem.click()
        await this.selectGroupMenuItem('Category')
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const isHidden = await this.entityMenu.getAttribute('area-hidden')
        if (isHidden == 'true') {
            await groupMenuItem.click()
        }
    }
}