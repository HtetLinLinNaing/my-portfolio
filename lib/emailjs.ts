import { init, send } from '@emailjs/browser';
import type { ContactFormValues } from '@/lib/contact-schema';

export type ContactErrorCategory = 'configuration' | 'rate-limit' | 'service' | 'network';

export class ContactSendError extends Error {
  constructor(
    public readonly category: ContactErrorCategory,
    public readonly retryable: boolean,
    public readonly status?: number,
  ) {
    super(category === 'configuration' ? 'Contact service is not configured.' : 'Contact submission failed.');
    this.name = 'ContactSendError';
  }
}

function getEmailJsConfig() {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();

  if (!serviceId || !templateId || !publicKey) {
    throw new ContactSendError('configuration', false);
  }

  return { serviceId, templateId, publicKey };
}

export async function sendContactMessage(values: ContactFormValues): Promise<void> {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();

  try {
    init({ publicKey });
    await send(serviceId, templateId, {
      from_name: values.name,
      reply_to: values.email,
      subject: values.subject,
      message: values.message,
    });
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'status' in error && typeof error.status === 'number') {
      const status = error.status;
      if (status === 429) throw new ContactSendError('rate-limit', true, status);
      throw new ContactSendError('service', status >= 500, status);
    }
    if (typeof error === 'string') throw new ContactSendError('configuration', false);
    throw new ContactSendError('network', true);
  }
}
