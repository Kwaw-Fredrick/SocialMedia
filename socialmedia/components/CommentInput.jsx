'use client'

import { addComment } from '@/actions/Post'
import { useUser } from '@clerk/nextjs'
import { Icon } from '@iconify/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Avatar, Button, Flex, Input } from 'antd'
import React from 'react'
import toast from 'react-hot-toast'

const CommentInput = ({ postId, setExpanded, queryId }) => {
    const { user } = useUser()
    const [value, setValue] = React.useState("")
    const queryClient = useQueryClient()

    const { isPending, mutate } = useMutation({
        mutationFn: (value) => addComment(postId, value),

        onMutate: async (value) => {
            setExpanded(true)

            await queryClient.cancelQueries({
                queryKey: ["posts", queryId]
            })

            const previousPosts = queryClient.getQueryData([
                "posts",
                queryId
            ])

            queryClient.setQueriesData(
                ["posts", queryId],
                (old) => {
                    if (!old) return old

                    return {
                        ...old,
                        pages: old.pages.map((page) => ({
                            ...page,
                            data: page.data.map((post) => {
                                if (post.id === postId) {
                                    return {
                                        ...post,
                                        comments: [
                                            ...post.comments,
                                            {
                                                id: Date.now(),
                                                comment: value,
                                                authorId: user?.id,
                                                author: {
                                                    first_name: user?.firstName,
                                                    last_name: user?.lastName,
                                                    image_url: user?.imageUrl,
                                                }
                                            }
                                        ]
                                    }
                                }
                                return post
                            })
                        }))
                    }
                }
            )

            return { previousPosts }
        },

        onError: (err, variables, context) => {
            toast.error("Failed to add Comment")

            if (context?.previousPosts) {
                queryClient.setQueryData(
                    ["posts", queryId],
                    context.previousPosts
                )
            }
        },

        onSuccess: () => {
            setValue("")
        }
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
                onChange={(e) => setValue(e.target.value)}
            />
            <Button type='primary'
                onClick={() => mutate(value)}
                disabled={isPending || !value || value === ""}
            >
                <Icon
                    icon={"iconamoon:send-fill"} width={"1.2rem"}
                />
            </Button>
        </Flex>
    )
}

export default CommentInput