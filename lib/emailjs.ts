import { init, send } from '@emailjs/browser';
import type { ContactFormValues } from '@/lib/contact-schema';

function getEmailJsConfig() {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Contact service is not configured.');
  }

  return { serviceId, templateId, publicKey };
}

export async function sendContactMessage(values: ContactFormValues): Promise<void> {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();

  init({ publicKey });
  await send(serviceId, templateId, {
    from_name: values.name,
    reply_to: values.email,
    subject: values.subject,
    message: values.message,
  });
}
