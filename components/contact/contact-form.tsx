'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, LoaderCircle } from 'lucide-react';
import { contactSchema, type ContactFormValues } from '@/lib/contact-schema';
import { ContactSendError, sendContactMessage } from '@/lib/emailjs';
import { socials } from '@/data/socials';
import { Button } from '@/components/ui/button';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

interface ContactField {
  name: keyof ContactFormValues;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'textarea';
  autoComplete?: string;
}

const contactFields: ContactField[] = [
  { name: 'name', label: 'Name', placeholder: 'Your name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Your email', placeholder: 'you@example.com', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', placeholder: 'What would you like to discuss?', type: 'text' },
  { name: 'message', label: 'Message', placeholder: 'Tell me about the role or project…', type: 'textarea' },
];

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [sendError, setSendError] = useState<ContactSendError | null>(null);
  const sending = useRef(false);
  const linkedin = socials.find((social) => social.platform === 'LinkedIn');

  function updateValue(field: keyof ContactFormValues, value: string) {
    if (status === 'submitting') return;
    setSendError(null);
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== 'idle') {
      setStatus('idle');
    }
  }

  async function submitForm() {
    if (sending.current) return;
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

    sending.current = true;
    setErrors({});
    setSendError(null);
    setStatus('submitting');

    try {
      await sendContactMessage(result.data);
      setStatus('success');
    } catch (error) {
      const failure = error instanceof ContactSendError ? error : new ContactSendError('network', true);
      setSendError(failure);
      console.warn('Contact submission failed', { category: failure.category, status: failure.status });
      setStatus('error');
    } finally {
      sending.current = false;
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
      disabled: status === 'submitting',
      required: true,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateValue(field, event.target.value),
      'aria-invalid': Boolean(errors[field]),
      'aria-describedby': errors[field] ? `${field}-error` : undefined,
      className:
        'mt-1 w-full min-w-0 rounded-lg border border-border bg-background/70 px-3 py-2 text-base text-ink outline-none placeholder:text-[13px] placeholder:font-normal placeholder:text-muted/70 hover:border-accent/40 focus:border-accent focus:bg-surface focus:ring-3 focus:ring-accent/10 aria-invalid:border-red-600 aria-invalid:focus:ring-red-600/15 motion-safe:transition-colors motion-safe:duration-200 disabled:cursor-wait disabled:opacity-70',
    };
  }

  function renderField(field: ContactField) {
    const props = fieldProps(field.name);
    return (
      <div key={field.name}>
        <label htmlFor={field.name} className="block text-xs font-semibold leading-4 text-ink">{field.label}</label>
        {field.type === 'textarea'
          ? <textarea {...props} rows={3} placeholder={field.placeholder} className={`${props.className} block min-h-24 resize-y`} />
          : <input {...props} type={field.type} autoComplete={field.autoComplete} placeholder={field.placeholder} />}
        {errors[field.name] && <p id={`${field.name}-error`} className="mt-2 text-sm text-red-700 dark:text-red-300">{errors[field.name]}</p>}
      </div>
    );
  }

  return (
    <form className="space-y-2.5" aria-labelledby="contact-form-title" aria-busy={status === 'submitting'} noValidate onSubmit={handleSubmit}>
      <div className="mb-3 space-y-1">
        <h3 id="contact-form-title" className="text-lg font-semibold tracking-tight text-ink">Send a message</h3>
        <p className="text-xs leading-5 text-muted">Use your email address so I can reply.</p>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {contactFields.slice(0, 2).map(renderField)}
      </div>
      {contactFields.slice(2).map(renderField)}
      {status === 'success' && (
        <div role="status" aria-live="polite" className="rounded-2xl bg-accent/10 px-4 py-3 text-sm text-ink">
          Message sent. Thanks for reaching out.
        </div>
      )}
      {status === 'error' && (
        <div role="status" aria-live="polite" className="space-y-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          <p>
            {sendError?.category === 'rate-limit'
              ? 'Too many requests. Please wait a moment before trying again.'
              : sendError?.retryable === false
                ? 'The contact service is currently unavailable. Please contact me on LinkedIn instead.'
                : 'Could not send your message. Please check your connection and try again.'}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {sendError?.retryable !== false && (
              <Button type="button" variant="muted" className="px-3 py-2 text-xs" onClick={() => void submitForm()}>
                Try again
              </Button>
            )}
            {linkedin && <a href={linkedin.url} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">Contact me on LinkedIn</a>}
          </div>
        </div>
      )}
      <Button type="submit" className="group min-h-11 w-full gap-2 text-sm" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
        {status === 'submitting'
          ? <LoaderCircle size={18} aria-hidden="true" className="motion-safe:animate-spin" />
          : <ArrowUpRight size={18} aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />}
      </Button>
    </form>
  );
}
