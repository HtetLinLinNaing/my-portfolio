import { describe, expect, it } from 'vitest';
import { contactSchema } from '@/lib/contact-schema';

describe('contactSchema', () => {
  it('rejects missing fields and invalid email syntax', () => {
    expect(contactSchema.safeParse({ name: '', email: 'bad', subject: '', message: '' }).success).toBe(false);
  });

  it('accepts a complete contact message', () => {
    expect(
      contactSchema.safeParse({
        name: 'A',
        email: 'a@example.com',
        subject: 'Hello',
        message: 'Hi',
      }).success,
    ).toBe(true);
  });

  it('trims whitespace before returning values', () => {
    const result = contactSchema.safeParse({
      name: '  A  ',
      email: '  a@example.com  ',
      subject: '  Hello  ',
      message: '  Hi  ',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ name: 'A', email: 'a@example.com', subject: 'Hello', message: 'Hi' });
    }
  });
});
