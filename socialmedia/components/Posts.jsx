'use client'

import { getMyFeedPosts } from '@/actions/Post'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Flex, Spin, Typography } from 'antd'
import React from 'react'

const Posts = () => {
    const {data, isLoading, isError, isSuccess} = useInfiniteQuery({
        queryKey: "posts",
        queryFn: (pageParam = "" ) => getMyFeedPosts(pageParam),
        getNextPageParam: (lastPage) =>{
            return lastPage?.metaData?.lastCursor
        }
    })

    if(isError){
          return <Typography>Something went wrong</Typography>
    }

    if(isLoading){
        return (
                <Flex vertical align='center' gap="large">
                    <Spin/>
                    <Typography>Loading....</Typography>
                </Flex>
        )
    }  
    
    if(isSuccess){
        return(
            <Flex vertical gap={"1rem"}> 
            {
             data?.pages?.map((page) => 
                page?.data?.map((post, index) =>
                    <div key={index}  style={{width: "100%", background: "blue"}}>
                        <span>man</span>
                    </div>        
                )
            )
            }
            </Flex>
        )
    }
}

export default Posts;