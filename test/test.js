'use strict';

const {expect} = require('chai');
const puppeteer = require('puppeteer');

describe('sizeme', function () {
  // Define global variables
  let browser;
  let page;

  before(async function () {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  beforeEach(async function () {
    page = await browser.newPage();

    await page.goto('http://localhost:9000');
  });

  afterEach(async function () {
    await page.close();
  });

  after(async function () {
    await browser.close();
  });

  it('Screen Size - Mobile', async function () {
    await page.setViewport({
        width: 763,
        height: 600
    });
    
    await page.evaluate(() => sizeme.load({ forceJsSizes: true }));

    expect(await page.evaluate(() => sizeme.getDeviceType())).to.equal('mobile');
    expect(await page.evaluate(() => sizeme.isMobile())).to.equal(true);
    expect(await page.evaluate(() => sizeme.isResponsive())).to.equal(true);
    expect(await page.evaluate(() => sizeme.isTablet())).to.equal(false);
  });

  it('Screen Size - Tablet', async function () {
    await page.setViewport({
        width: 800,
        height: 600
    });
    
    await page.evaluate(() => sizeme.load({ forceJsSizes: true }));

    expect(await page.evaluate(() => sizeme.getDeviceType())).to.equal('tablet');
    expect(await page.evaluate(() => sizeme.isMobile())).to.equal(false);
    expect(await page.evaluate(() => sizeme.isResponsive())).to.equal(true);
    expect(await page.evaluate(() => sizeme.isTablet())).to.equal(true);
  });

  it('Screen Size - Small Desktop', async function () {
    await page.setViewport({
        width: 1100,
        height: 600
    });
    
    await page.evaluate(() => sizeme.load({ forceJsSizes: true }));

    expect(await page.evaluate(() => sizeme.getDeviceType())).to.equal('small_desktop');
    expect(await page.evaluate(() => sizeme.isSmallDesktop())).to.equal(true);
    expect(await page.evaluate(() => sizeme.isResponsive())).to.equal(false);
    expect(await page.evaluate(() => sizeme.isDesktop())).to.equal(false);
  });

  it('Screen Size - Desktop', async function () {
    await page.setViewport({
        width: 1201,
        height: 600
    });
    
    await page.evaluate(() => sizeme.load({ forceJsSizes: true }));

    expect(await page.evaluate(() => sizeme.getDeviceType())).to.equal('desktop');
    expect(await page.evaluate(() => sizeme.isSmallDesktop())).to.equal(false);
    expect(await page.evaluate(() => sizeme.isResponsive())).to.equal(false);
    expect(await page.evaluate(() => sizeme.isDesktop())).to.equal(true);
  });

  it('CSS Size - Mobile', async function () {
    await page.setViewport({
        width: 600,
        height: 600
    });
    
    await page.evaluate(() => sizeme.load({ forceJsSizes: false }));

    expect(await page.evaluate(() => sizeme.getDeviceType())).to.equal('mobile');
    expect(await page.evaluate(() => sizeme.isMobile())).to.equal(true);
    expect(await page.evaluate(() => sizeme.isResponsive())).to.equal(true);
    expect(await page.evaluate(() => sizeme.isTablet())).to.equal(false);
  });

  it('CSS Size - Tablet', async function () {
    await page.setViewport({
        width: 701,
        height: 600
    });
    
    await page.evaluate(() => sizeme.load({ forceJsSizes: false }));

    expect(await page.evaluate(() => sizeme.getDeviceType())).to.equal('tablet');
    expect(await page.evaluate(() => sizeme.isMobile())).to.equal(false);
    expect(await page.evaluate(() => sizeme.isResponsive())).to.equal(true);
    expect(await page.evaluate(() => sizeme.isTablet())).to.equal(true);
  });

  it('CSS Size - Desktop', async function () {
    await page.setViewport({
        width: 1100,
        height: 600
    });
    
    await page.evaluate(() => sizeme.load({ forceJsSizes: false }));

    expect(await page.evaluate(() => sizeme.getDeviceType())).to.equal('desktop');
    expect(await page.evaluate(() => sizeme.isSmallDesktop())).to.equal(false);
    expect(await page.evaluate(() => sizeme.isResponsive())).to.equal(false);
    expect(await page.evaluate(() => sizeme.isDesktop())).to.equal(true);
  });

  it('CSS Size - Big Desktop', async function () {
    await page.setViewport({
        width: 1400,
        height: 600
    });
    
    await page.evaluate(() => sizeme.load({ forceJsSizes: false }));

    expect(await page.evaluate(() => sizeme.getDeviceType())).to.equal('big_desktop');
    expect(await page.evaluate(() => sizeme.isSmallDesktop())).to.equal(false);
    expect(await page.evaluate(() => sizeme.isResponsive())).to.equal(false);
    expect(await page.evaluate(() => sizeme.isDesktop())).to.equal(false);
  });
});