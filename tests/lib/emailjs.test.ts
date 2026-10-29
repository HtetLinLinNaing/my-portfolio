import { beforeEach, describe, expect, it, vi } from 'vitest';
import { init, send } from '@emailjs/browser';
import { sendContactMessage } from '@/lib/emailjs';

vi.mock('@emailjs/browser', () => ({
  init: vi.fn(),
  send: vi.fn().mockResolvedValue({ status: 200, text: 'OK' }),
}));

describe('sendContactMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID', 'service_test');
    vi.stubEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', 'template_test');
    vi.stubEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', 'public_test');
  });

  it('initializes and sends the expected EmailJS payload', async () => {
    await sendContactMessage({ name: 'A', email: 'a@example.com', subject: 'Hello', message: 'Hi' });

    expect(init).toHaveBeenCalledWith({ publicKey: 'public_test' });
    expect(send).toHaveBeenCalledWith('service_test', 'template_test', {
      from_name: 'A',
      reply_to: 'a@example.com',
      subject: 'Hello',
      message: 'Hi',
    });
  });

  it('rejects without sending when configuration is incomplete', async () => {
    vi.stubEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', '');

    await expect(
      sendContactMessage({ name: 'A', email: 'a@example.com', subject: 'Hello', message: 'Hi' }),
    ).rejects.toThrow('Contact service is not configured.');
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    [{ status: 429, text: 'sensitive provider details' }, 'rate-limit', true],
    [{ status: 403, text: 'sensitive provider details' }, 'service', false],
    [{ status: 400, text: 'sensitive provider details' }, 'service', false],
    [{ status: 503, text: 'sensitive provider details' }, 'service', true],
    [new TypeError('Failed to fetch'), 'network', true],
  ])('normalizes provider errors without exposing raw details', async (error, category, retryable) => {
    vi.mocked(send).mockRejectedValueOnce(error);
    await expect(sendContactMessage({ name: 'A', email: 'a@example.com', subject: 'Hello', message: 'Hi' }))
      .rejects.toMatchObject({ category, retryable });
  });

  it('classifies missing configuration as non-retryable', async () => {
    vi.stubEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID', '');
    await expect(sendContactMessage({ name: 'A', email: 'a@example.com', subject: 'Hello', message: 'Hi' }))
      .rejects.toMatchObject({ category: 'configuration', retryable: false });
  });
});
