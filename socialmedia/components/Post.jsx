import React from 'react'
import css from '../styles/post.module.css'
import { Avatar, Flex, Image, Typography } from 'antd'
import Box from './Box/Box'
import { getFileTypeFromUrl } from '@/utils'
import LikeButton from './LikeButton'
import dayjs from 'dayjs'
import CommentButton from './CommentButton'
import CommentSection from './CommentSection'

const Post = ({ data, querryId }) => {

    const fileType = getFileTypeFromUrl(data?.media)

    return (
        <div className={css.wrapper}>
            <Box className={css.container}>

                {/* profile */}
                <Flex align="center" justify="space-between">
                    <Flex align="center" gap=".5rem">
                        <Avatar src={data?.author?.image_url} size={40} />

                        <Flex vertical>
                            <Typography className="typoSubtitle2">
                                {data?.author?.first_name} {data?.author?.last_name}
                            </Typography>

                            <Typography.Text
                                className="typoCaption"
                                type="secondary"
                                strong
                            >
                                {dayjs(data?.created_at).format("DD MMM YYYY")}
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Flex>

                {/* caption */}
                <Typography.Text>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data?.postText?.replace(/\n/g, "<br />") || "",
                        }}
                    />
                </Typography.Text>

                {/* media */}
                {fileType === "video" && (
                    <div className={css.media}>
                        <video
                            src={data?.media}
                            controls
                            style={{ width: "100%", objectFit: "cover" }}
                        />
                    </div>
                )}

                {fileType === "image" && (
                    <div className={css.media}>
                        <Image
                            src={data?.media}
                            alt="Post media"
                            style={{ width: "100%", objectFit: "cover" }}
                        />
                    </div>
                )}

                {/* actions */}
               <Flex align="center" gap=".5rem" className={css.actions}>
                    <LikeButton
                        postId={data?.id}
                        likes={data?.likes}
                        querryId={querryId}
                    />

                    <CommentButton comments={data?.comments.length}/>
                </Flex>
                
                {/*Comment Section */}
                <CommentSection
                comments={data?.comments}
                postId = {data?.id}
                querryId={querryId}
                />

            </Box>
        </div>
    )
}

export default Post