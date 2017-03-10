import { FinHeartBelPage } from './app.po';

describe('fin-heart-bel App', () => {
  let page: FinHeartBelPage;

  beforeEach(() => {
    page = new FinHeartBelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
