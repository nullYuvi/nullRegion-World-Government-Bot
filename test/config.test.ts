import { config } from '../src/config';

describe('Configuration', () => {
  it('should be defined', () => {
    expect(config).toBeDefined();
  });

  it('should have a roles object', () => {
    expect(config.roles).toBeDefined();
    expect(config.roles.ranks).toBeDefined();
    expect(config.roles.self).toBeDefined();
  });
});
