import { mocked } from 'ts-jest/utils';
import { Color } from '../typings/roulette-scrapper.typings';
import { getElement } from '../utils/element';
import CSGOEmpireRouletteScrapper from './csgoempire-roulette-scrapper.scrapper';
jest.mock('../utils/element');
describe('CSGOEmpireRouletteScrapper', () => {
  let scrapper: CSGOEmpireRouletteScrapper;
  beforeEach(() => {
    scrapper = new CSGOEmpireRouletteScrapper();
  });
  it('should throw exception when cannot get bets total', () => {
    const mockedGetElement = mocked(getElement);
    mockedGetElement.mockImplementationOnce(
      () => ({ innerText: '' } as HTMLElement)
    );
    expect(() => scrapper.getBetsTotalByColor(Color.Black)).toThrow(
      'Cannot extract regex "\\d+ Bets Total" from content'
    );
  });
  it('should get bets total', () => {
    expect(scrapper.getBetsTotalByColor(Color.Black)).toBe(10);
  });
});