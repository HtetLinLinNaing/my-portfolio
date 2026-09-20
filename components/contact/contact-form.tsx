'use client';

import { useState } from 'react';
import { contactSchema, type ContactFormValues } from '@/lib/contact-schema';
import { sendContactMessage } from '@/lib/emailjs';
import { Button } from '@/components/ui/button';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  function updateValue(field: keyof ContactFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== 'idle') {
      setStatus('idle');
    }
  }

  async function submitForm() {
    const result = contactSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormValues | undefined;
        if (field && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      });
      setErrors(nextErrors);
      setStatus('idle');
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      await sendContactMessage(result.data);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== 'submitting') {
      void submitForm();
    }
  }

  function fieldProps(field: keyof ContactFormValues) {
    return {
      id: field,
      name: field,
      value: values[field],
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateValue(field, event.target.value),
      'aria-invalid': Boolean(errors[field]),
      'aria-describedby': errors[field] ? `${field}-error` : undefined,
      className:
        'mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-ink outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20',
    };
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-ink">
            Name
          </label>
          <input type="text" autoComplete="name" {...fieldProps('name')} />
          {errors.name && <p id="name-error" className="mt-2 text-sm text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-ink">
            Email
          </label>
          <input type="email" autoComplete="email" {...fieldProps('email')} />
          {errors.email && <p id="email-error" className="mt-2 text-sm text-red-700">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="text-sm font-semibold text-ink">
          Subject
        </label>
        <input type="text" {...fieldProps('subject')} />
        {errors.subject && <p id="subject-error" className="mt-2 text-sm text-red-700">{errors.subject}</p>}
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-semibold text-ink">
          Message
        </label>
        <textarea rows={6} {...fieldProps('message')} />
        {errors.message && <p id="message-error" className="mt-2 text-sm text-red-700">{errors.message}</p>}
      </div>
      {status === 'success' && (
        <div role="status" aria-live="polite" className="rounded-2xl bg-accent/10 px-4 py-3 text-sm text-ink">
          Message sent. Thanks for reaching out.
        </div>
      )}
      {status === 'error' && (
        <div role="status" aria-live="polite" className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">
          <span>Could not send your message. Please try again.</span>
          <Button type="button" variant="muted" className="px-3 py-2 text-xs" onClick={() => void submitForm()}>
            Try again
          </Button>
        </div>
      )}
      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
