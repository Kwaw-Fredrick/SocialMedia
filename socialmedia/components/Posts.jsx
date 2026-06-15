'use client'

import { getMyFeedPosts } from '@/actions/Post'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Flex, Spin, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Post from './Post'

const Posts = ({ id = "all" }) => {
    const { ref, inView } = useInView()

    const { data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } =
        useInfiniteQuery({
            queryKey: ['posts', id],
            queryFn: ({ pageParam = '' }) => getMyFeedPosts(pageParam),
            initialPageParam: '',
            getNextPageParam: (lastPage) => lastPage?.metaData?.lastCursor,
        })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    if (isLoading) {
        return (
            <Flex vertical align="center" gap="large">
                <Spin />
                <Typography>Loading....</Typography>
            </Flex>
        )
    }

    if (isError) {
        return (
            <Flex vertical align="center">
                <Typography>Failed to load posts</Typography>
            </Flex>
        )
    }

    if (isSuccess) {
        return (
            <Flex vertical gap="1rem">
                {data?.pages?.map((page, pageIndex) =>
                    page?.data?.map((post, index) => {
                        const isLast =
                            pageIndex === data.pages.length - 1 &&
                            index === page.data.length - 1

                        return isLast ? (
                            <div ref={ref} key={post?.id}>
                                <Post data={post} queryId={id} />
                            </div>
                        ) : (
                            <div key={post?.id}>
                                <Post data={post} queryId={id} />
                            </div>
                        )
                    })
                )}

                {(isFetchingNextPage || isFetching) && (
                    <Flex vertical align="center" gap="large">
                        <Spin />
                        <Typography>Loading....</Typography>
                    </Flex>
                )}
            </Flex>
        )
    }

    return null
}

export default Posts