'use client'

import { getMyFeedPosts } from '@/actions/Post'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Flex, Spin, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Post from './Post'

const Posts = (id ="all") => {
    const { ref, inView } = useInView()

    const checkLastViewRef = (index, page) => {
        if (index === page?.data?.length - 1) {
            return true
        } else {
            return false
        }
    }

    const { data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = '' }) => getMyFeedPosts(pageParam),
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage?.metaData?.lastCursor,
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [hasNextPage, inView, fetchNextPage])

    if (isLoading) {
        return (
            <Flex vertical align='center' gap="large">
                <Spin />
                <Typography>Loading....</Typography>
            </Flex>
        )
    }

    if (isSuccess) {
        return (
            <Flex vertical gap={"1rem"}>
                {data?.pages?.map((page) =>
                    page?.data?.map((post, index) =>
                        checkLastViewRef(index, page) ? (
                            <div
                                ref={ref}
                                key={post?.id}
                            >
                                <Post data={post} querryId={Id} />
                            </div>
                        ) : (
                            <div
                                key={post?.id}
                            >
                                <Post data={post} querryId={Id} />
                            </div>
                        )
                    )
                )}{
                    (isFetchingNextPage || isFetching || isFetchingNextPage) && (
                        <Flex vertical align='center' gap="large">
                            <Spin />
                            <Typography>Loading....</Typography>
                        </Flex>
                    )
                }
            </Flex>
        )
    }

    return null
}

export default Posts