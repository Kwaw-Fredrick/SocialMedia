import React from 'react'
import css from '../styles/post.module.css'
import { Avatar, Flex, Image, Typography } from 'antd'
import Box from './Box/Box'
import { getFileTypeFromUrl } from '@/utils'
import LikeButton from './LikeButton'
const Post = ({ data, querryId   }) => {
    return (
        <div className={css.wrapper}>
           <Box className={css.container}>
            {/*profile information*/}
            <Flex align="center" justify="space-between">
                {/*left content*/}
                <Flex align="center" gap={'.5rem'}>
                    <Avatar 
                    src={data?.author?.image_url} 
                    size={40} />

                    {/*name and post date*/}
                    <Flex vertical>
                        <Typography className='typoSubtitle2'>
                            {data?.author?.first_name} {data?.author?.last_name}
                        </Typography>

                        <Typography.Text 
                        className='typoCaption'
                        type='secondary'
                        strong
                        >
                            {dayjs( data?.created_at).format("DD MMM YYYY")}
                        </Typography.Text>
                    </Flex>
                </Flex>
            </Flex>

            {/*caption*/}

            <Typography.Text>
                 <div
                    dangerouslySetInnerHTML={{
                        __html: data?.postText?replace(/\n/g, "<br />"):"", 
                    }}
                 />
            </Typography.Text>

            {/*post media*/}

            {
                getFileTypeFromUrl(data?.media) === "video" &&  (
                    <div className={css.media}>
                        <video 
                        src={data?.media} 
                        alt="Post media" 
                        controls 
                        style={{objectFit: "cover"}} />
                    </div>
                )
            }
            {
                getFileTypeFromUrl(data?.media) === "video" &&  (
                    <div className={css.media}>
                        <video 
                        src={data?.media} 
                        alt="Post media"  
                        controls
                        style={{height: "100%", width: "100%"}}
                        />
                    </div>
                )
            }

            {/*actions*/}
            <Flex align="center" gap={'.5rem'} className={css.actions}>
                    <LikeButton postId={data?.id} likes={data?.likes} querryId={querryId} />
                    <span> Comments </span>
            </Flex>
           </Box>
        </div>
    )
}

export default Post 