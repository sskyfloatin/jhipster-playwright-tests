import { test } from '../fixtures/pageFIxtures'


test.describe(`Verify home page`, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test(`Verify home page Welcome message`, async ({ homePage }) => {
    await homePage.verifyWelcomeMessage('Welcome, Java Hipster!');
  });

  const externalLinks = [
    { name: 'JHipster homepage', locatorKey: 'homePageLink', url: 'https://www.jhipster.tech/' },
    { name: 'Stack Overflow', locatorKey: 'stackOverFlowLink', url: 'https://stackoverflow.com/tags/jhipster/info' },
    { name: 'Bug tracker', locatorKey: 'trackerLink', url: 'https://github.com/jhipster/generator-jhipster/issues?state=open' },
    { name: 'Chat room', locatorKey: 'chatRoomLink', url: 'https://gitter.im/jhipster/generator-jhipster' },
    { name: 'Twitter', locatorKey: 'twitterLink', url: 'https://twitter.com/jhipster' },
    { name: 'GitHub', locatorKey: 'gitHubLink', url: 'https://github.com/jhipster/generator-jhipster' },
  ] as const;

  test(`Verify external links`, async ({ homePage }) => {
    for (const link of externalLinks) {
      await test.step(`Verify ${link.name} link`, async () => {
        const locator = homePage[link.locatorKey];
        await homePage.verifyExternalLink(locator, link.url);
      });
    }
  });
}); 