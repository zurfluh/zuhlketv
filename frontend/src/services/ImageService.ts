
export function getImageUrl(path: string | null, size: string = 'w500'): string {
    if (path) {
        return `https://image.tmdb.org/t/p/${size}/${path}`;
    } else {
        return 'http://via.placeholder.com/300x100?text=No%20Image';
    }
}
