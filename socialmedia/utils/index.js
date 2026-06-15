export const getFileTypeFromUrl = (url) => {
    if (!url) return "unknown";

    // ✅ handle base64 / data URLs (THIS IS YOUR CASE)
    if (url.startsWith("data:image")) return "image";
    if (url.startsWith("data:video")) return "video";

    // ✅ handle normal URLs
    const cleanUrl = url.split('?')[0];
    const extension = cleanUrl.split('.').pop()?.toLowerCase();

    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
            return 'image';

        case 'mp4':
        case 'avi':
        case 'mov':
        case 'webm':
            return 'video';

        default:
            return "unknown";
    }
};

export const updateQueryCacheLikes = (
    postLikes,
    postId,
    userId,
    actionType
)=>{
    if (actionType === 'like'){
        return [...postLikes, {authorId: userId, postId}]
    } else{
        return postLikes.filter((like) => like.authorId !== userId)
    }
}