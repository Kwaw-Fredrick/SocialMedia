"use client"

import { updatePostLike } from "@/actions/Post"
import { useUser } from "@clerk/nextjs"
import { Icon } from "@iconify/react"
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { Button, Flex, Typography } from "antd"
import React from "react"

const LikeButton = ({
  postId,
  likes,
  queryId,
}) => {
  const { user } = useUser()

  const queryClient = useQueryClient()

  const isLiked =
    likes?.some(
      (like) =>
        like.authorId === user?.id
    ) || false

  const actionType = isLiked ? "unlike" : "like"

  const { mutate } = useMutation({
    mutationFn: updatePostLike,

    onMutate: async ({postId, actionType,}) => {
      await queryClient.cancelQueries({
        queryKey: [queryId],
      })

      queryClient.setQueryData([queryId],(old) => {
          if (!old) return old

          return {
            ...old,
            pages: old.pages.map((page) => ({...page, data: page.data.map((post) => {
                    if (
                      post.id !== postId
                    )
                      return post

                    return {
                      ...post,
                      likes:
                        actionType ==="like" ? [ ...post.likes, {
                            authorId:
                            user.id,
                              },
                            ] : post.likes.filter((l) => l.authorId !== user.id),
                    }
                  }
                ),
              })
            ),
          }
        }
      )
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryId],
      })
    },
  })

  return (
    <Button
      size="small"
      style={{
        backgroundColor: "transparent",
        border: "none",
        boxShadow: "none",
      }}
      onClick={() => mutate({postId, actionType,})}
    >
      <Flex gap=".5rem">
        <Icon
          icon="ph:heart-fill"
          width={20}
          height={20}
          style={{
            color: isLiked
              ? "red"
              : "gray",
          }}
        />

        <Typography.Text>
          {likes?.length
            ? `${likes.length} Likes`
            : "Like"}
        </Typography.Text>
      </Flex>
    </Button>
  )
}

export default React.memo(LikeButton)