import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from '@/components/contact/contact-form';
import { sendContactMessage } from '@/lib/emailjs';

vi.mock('@/lib/emailjs', async (importOriginal) => ({
  ...await importOriginal<typeof import('@/lib/emailjs')>(),
  sendContactMessage: vi.fn(),
}));

const mockedSendContactMessage = vi.mocked(sendContactMessage);

function fillForm() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'A' } });
  fireEvent.change(screen.getByLabelText('Your email'), { target: { value: 'a@example.com' } });
  fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Hello' } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hi' } });
}

describe('ContactForm', () => {
  beforeEach(() => {
    mockedSendContactMessage.mockReset();
  });

  it('shows field errors for an invalid submission', async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
  });

  it('disables submission while sending and confirms success', async () => {
    let resolveSend: () => void = () => undefined;
    mockedSendContactMessage.mockImplementation(
      () => new Promise<void>((resolve) => {
        resolveSend = resolve;
      }),
    );
    render(<ContactForm />);
    fillForm();

    const submit = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submit);
    expect(submit).toBeDisabled();
    expect(mockedSendContactMessage).toHaveBeenCalledTimes(1);

    resolveSend();
    expect(await screen.findByRole('status')).toHaveTextContent(/message sent/i);
  });

  it('shows a retry action when sending fails and preserves the fields', async () => {
    mockedSendContactMessage.mockRejectedValueOnce(new Error('Network error'));
    render(<ContactForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByRole('status')).toHaveTextContent(/could not send/i);
    expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('does not submit a second time while the first request is pending', async () => {
    let resolveSend: () => void = () => undefined;
    mockedSendContactMessage.mockImplementation(
      () => new Promise<void>((resolve) => {
        resolveSend = resolve;
      }),
    );
    render(<ContactForm />);
    fillForm();
    const submit = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submit);
    await userEvent.click(submit);

    expect(mockedSendContactMessage).toHaveBeenCalledTimes(1);
    resolveSend();
    await waitFor(() => expect(submit).not.toBeDisabled());
  });

  it('keeps one request in flight when fields change and the form is submitted again', async () => {
    let finishSend: () => void = () => undefined;
    mockedSendContactMessage.mockImplementation(() => new Promise<void>((resolve) => { finishSend = resolve; }));
    render(<ContactForm />);
    fillForm();
    const subject = screen.getByLabelText('Subject');
    const submit = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submit);
    fireEvent.change(subject, { target: { value: 'Changed during send' } });
    fireEvent.submit(submit.closest('form')!);
    expect(mockedSendContactMessage).toHaveBeenCalledTimes(1);
    expect(submit).toBeDisabled();
    expect(subject).toBeDisabled();
    expect(subject).toHaveValue('Hello');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    finishSend();
    expect(await screen.findByRole('status')).toHaveTextContent(/message sent/i);
  });

  it('preserves a failed draft and guards the retry request', async () => {
    let finishRetry: () => void = () => undefined;
    mockedSendContactMessage.mockRejectedValueOnce(new Error('Network error'))
      .mockImplementationOnce(() => new Promise<void>((resolve) => { finishRetry = resolve; }));
    render(<ContactForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    fireEvent.click(await screen.findByRole('button', { name: /try again/i }));
    const submit = screen.getByRole('button', { name: /sending/i });
    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'New draft' } });
    fireEvent.submit(submit.closest('form')!);
    expect(mockedSendContactMessage).toHaveBeenCalledTimes(2);
    expect(screen.getByLabelText('Subject')).toHaveValue('Hello');
    finishRetry();
    expect(await screen.findByRole('status')).toHaveTextContent(/message sent/i);
  });
});
