import { ChatGateway } from './chat.gateway';

describe('ChatGateway message rate limit', () => {
  it('allows a short message burst and rejects messages beyond the rolling limit', () => {
    const gateway = new ChatGateway({} as never, {} as never, {} as never);
    const canSend = (
      gateway as unknown as { canSend(userId: string): boolean }
    ).canSend.bind(gateway);

    for (let message = 0; message < 20; message += 1) {
      expect(canSend('user-1')).toBe(true);
    }

    expect(canSend('user-1')).toBe(false);
    expect(canSend('user-2')).toBe(true);
  });
});