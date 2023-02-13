import { getDir, getFile } from '../utilities/get';
import { assets } from '../routes/gallery';
describe('utilitie get file test', () => {
  it('should be true if the directory exist ', () => {
    const data = getDir(assets.images());
    expect(data).toBeTruthy();
  });
  it('should get files name in the directory', () => {
    const data = getDir(assets.images());
    expect(data).toEqual([
      { path: '/assets/images/encenadaport.jpg' },
      { path: '/assets/images/fjord.jpg' },
      { path: '/assets/images/icelandwaterfall.jpg' },
      { path: '/assets/images/palmtunnel.jpg' },
      { path: '/assets/images/santamonica.jpg' },
      { path: '/assets/images/unnamed.png' }
    ]);
  });
  it('should be true if the file exist', () => {
    const data = getFile(assets.source);
    expect(data).toBeTruthy();
  });
});
