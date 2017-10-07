
export function getImageUrl(path: string | null, size: string = 'w500'): string {
    if (path) {
        return `https://image.tmdb.org/t/p/${size}/${path}`;
    } else {
        return ''; // TODO: fallback image url
    }
}
