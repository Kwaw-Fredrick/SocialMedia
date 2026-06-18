'use client'

import { useUser } from '@clerk/nextjs'
import { Icon } from '@iconify/react'
import { useMutation } from '@tanstack/react-query'
import { Avatar, Button, Flex, Input } from 'antd'
import React from 'react'

const CommentInput = ({ postId, setExpanded, queryId }) => {
    const { user } = useUser()
    const [value, setValue] = React.useState("")
    const {isPending, mutate} = useMutation({
        mutationFn: (postId) => addComment(postId, value)
    })
    return (
        <Flex gap={'1rem'} align='center'>
            {/*avatar*/}
            <Avatar src={user?.imageUrl} size={40} style={{ maxWidth: "40px " }} />

            {/*input box */}
            <Input.TextArea
                placeholder='Write a comment...'
                style={{ resize: 'none' }}
                autoSize={{ minRows: 1, maxRows: 3 }}
                value={value}
                onChange={(e) => (e.target.value)}
            />
            <Button type='primary'>
                <Icon
                    icon={"iconamoon:send-fill"} width={"1.2rem"}
                />
            </Button>
        </Flex>
    )
}

export default CommentInput