import { HttpErrorResponse } from '@angular/common/http';
export function errorMessage(error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
        return 'The server took too long to respond. Please try again.';
    }
    if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
            return 'We could not reach the server. Check your connection and try again.';
        }
        if (error.status === 429) {
            return 'Too many requests. Wait a moment and try again.';
        }
        const message = error.error?.message;
        if (Array.isArray(message)) {
            return message.join(' ');
        }
        if (typeof message === 'string') {
            return message;
        }
    }
    return 'Something went wrong. Please try again.';
}