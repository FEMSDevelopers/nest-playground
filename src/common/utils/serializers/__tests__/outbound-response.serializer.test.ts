import { OutboundResponseSerializer } from '../outbound-response.serializer';

describe('OutboundResponseSerializer', () => {
  it('serializes the return message to contain payload only', () => {
    const serializer = new OutboundResponseSerializer();
    expect(serializer).toBeDefined();
    jest.spyOn(serializer, 'serialize');
    const result = serializer.serialize({ data: { id: '0' } });
    expect(serializer.serialize).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual({ id: '0' });
  });
});
