import  resize  from '../utilities/resize';
import * as fs from 'fs';
import { assets } from '../routes/gallery';
describe('utilitie resize file test', () => {
  it('should be true if the resize work as expected', async () => {
    await resize('encenadaport.jpg', 500, 600);
    expect(fs.existsSync(assets.thumb('encenadaport.jpg', 500, 600))).toBeTruthy();
  });

});
