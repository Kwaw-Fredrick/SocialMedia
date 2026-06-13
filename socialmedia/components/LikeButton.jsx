import { useUser } from '@clerk/nextjs'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Button, Flex, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

const LikeButton = ({ postId, likes, querryId }) => {
    const { user } = useUser()
    const isLiked = likes?.some(
            (like) => like.authorId === user?.id
        ) || false
    return (
        <Button size='small'
            style={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}>
            <Flex gap={'.5rem'} align='center'>
                <Icon
                    icon="ph:heart-fill"
                    width={20}
                    height={20}
                    style={{ color: isLiked ? 'red' : 'gray' }}
                />

                <Typography.Text className='typoBody2'>
                    {likes?.length ? `${likes.length} Likes` : "Like"}
                </Typography.Text>
            </Flex>
        </Button>
    )
}

export default LikeButton