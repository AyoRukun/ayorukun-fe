export function formatReportDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString();
}

export function formatRelativeTime(date) {
    const now = new Date();
    const posted = new Date(date);
    const diff = now - posted;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffSeconds = Math.floor(diff / 1000);

    if (diffDays > 0) {
        return `${diffDays} days ago`;
    }
    if (diffHours > 0) {
        return `${diffHours} hours ago`;
    }
    if (diffMinutes > 0) {
        return `${diffMinutes} minutes ago`;
    }
    if (diffSeconds > 0) {
        return `${diffSeconds} seconds ago`;
    }
    return 'just now';
}

export const sortByCreatedAt = (data) => {
    return [...data].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
    });
};

export default formatRelativeTime;
