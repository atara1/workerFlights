import { ConvertMinutesToTimePipe } from './convert-minutes-to-time.pipe';

describe('ConvertMinutesToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new ConvertMinutesToTimePipe();
    expect(pipe).toBeTruthy();
  });
});
