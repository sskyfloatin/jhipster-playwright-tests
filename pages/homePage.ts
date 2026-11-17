import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly homePageLink: Locator;
  readonly stackOverFlowLink: Locator;
  readonly trackerLink: Locator;
  readonly chatRoomLink: Locator;
  readonly twitterLink: Locator;
  readonly gitHubLink: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.locator('div.col-md-9 > h1');
    this.homePageLink = page.getByRole('link', { name: 'homepage' });
    this.stackOverFlowLink = page.getByRole('link', { name: 'overflow' });
    this.trackerLink = page.getByRole('link', { name: 'tracker' });
    this.chatRoomLink = page.getByRole('link', { name: 'room' });
    this.twitterLink = page.getByRole('link', { name: 'twitter' });
    this.gitHubLink = page.getByRole('link', { name: 'github' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async verifyWelcomeMessage(expectedMessage: string) {
    await expect(this.welcomeMessage).toHaveText(expectedMessage);
  }
  async verifyExternalLink(link: Locator, expectedUrl: string) {
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', expectedUrl);
    await expect(link).toHaveAttribute('target', '_blank');
  }
}