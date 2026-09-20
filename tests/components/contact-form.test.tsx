import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from '@/components/contact/contact-form';
import { sendContactMessage } from '@/lib/emailjs';

vi.mock('@/lib/emailjs', () => ({
  sendContactMessage: vi.fn(),
}));

const mockedSendContactMessage = vi.mocked(sendContactMessage);

function fillForm() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'A' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'a@example.com' } });
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
});
