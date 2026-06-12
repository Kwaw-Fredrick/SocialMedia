export const getFileTypeFromUrl = (url) => {
    if(url === undefined || url === null) return unknown
    const extension = url.split('.').pop().toLowerCase();


    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return 'image';
        case 'mp4':
        case 'avi':
        case 'mov':
            return 'video';
        default:
            return 'unknown';
    }
}