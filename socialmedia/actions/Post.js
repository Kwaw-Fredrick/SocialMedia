'use server'

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { uploadFile } from "./uploadFile";

export const createPost = async (post) =>{
    try {
        const {postText, media} = post;
        const user = await currentUser();
        
        let cld_id;
        let assertUrl
        if(media){
                   const res = await uploadFile(media, `/posts/${user?.id}`)
                   const {public_id, secure_url} = res;
                   cld_id = public_id,
                   assertUrl = secure_url
        }

        const newPost = await db.post.create({
            data : {
                postText,
                media: assertUrl, cld_id,
                author:{
                    connect:{
                        id: user?.id
                    }
                }
            }
        })

        console.log(newPost)
        return{
            data: newPost
        }

    } catch (error) {
        console.log(error?.message);
        throw new Error("Failed to create post");
    }
}

export const getMyFeedPosts = async (lastCursor)=>{
    try {
        const take = 5
        const posts = await db.post.findMany({
            include:{
                author: true,
            },
            take,
            ...(lastCursor && {
                skip: 1,
                cursor: {
                    id: lastCursor,
                } 
            }),
            orderBy:{
                createdAt: 'desc'
            }
        })

        if (posts.length === 0){
            return{
                data: [],
                metaData:{
                    lastCursor: null,
                    hasMore: false
                },
            };
        }

        const lastPostInResults = posts[posts.length - 1];
        const cursor = lastPostInResults.id;
        const morePosts = await db.post.findMany({
            take,
            skip:1,
            cursor: {
                id : cursor
            },
            orderBy:{
                createdAt: 'desc'
            }
        })

        return{
            data: posts,
            metaData:{
                lastCursor: cursor,
                hasMore: morePosts.length > 0
            }
        }
    } catch (error) {
        console.log(e);
        throw new Error("Failed to fetch a post");
        
        
    }
}