import { toast } from 'react-toastify';

export function toastSuccess(message) {
    toast.success(message ?? 'Success', {
        position: 'top-right',
    });
}

export function toastError(error) {
    toast.error(error, {
        position: 'top-right',
    });
}

export function toastInfo(message) {
    toast.info(message, {
        position: 'top-right',
    });
}
