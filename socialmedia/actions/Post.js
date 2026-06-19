'use server'

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { uploadFile } from "./uploadFile";

export const createPost = async (post) => {
  try {
    const { postText, media } = post;

    const clerkUser = await currentUser();

    if (!clerkUser?.id) {
      throw new Error("Not authenticated");
    }

    // ✅ ensure user exists
    const dbUser = await db.user.upsert({
      where: { id: clerkUser.id },
      update: {},
      create: {
        id: clerkUser.id,
        email_address: clerkUser.emailAddresses?.[0]?.emailAddress,
        first_name: clerkUser.firstName,
        last_name: clerkUser.lastName,
        image_url: clerkUser.imageUrl,
        username: clerkUser.username || undefined
      }
    });

    let cld_id = null;
    let assertUrl = null;

    if (media) {
      const res = await uploadFile(media, `/posts/${clerkUser.id}`);
      cld_id = res.public_id;
      assertUrl = res.secure_url;
    }

    const newPost = await db.post.create({
      data: {
        postText,
        media: assertUrl,
        cld_id,
        authorId: dbUser.id
      }
    });

    return { data: newPost };

  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post");
  }
};

export const getMyFeedPosts = async (lastCursor) => {
  try {
    const take = 5;

    const posts = await db.post.findMany({
      include: {
        author: true,
        likes: true,
        comments: true,
      },
      take,
      ...(lastCursor && {
        skip: 1,
        cursor: { id: lastCursor },
      }),
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: posts,
      metaData: {
        lastCursor: posts.at(-1)?.id ?? null,
        hasMore: posts.length === take,
      },
    };

  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};


export const updatePostLike = async(params) => {
  const {postId, actionType : type} = params; 
  try {
    const {id: userId} = await currentUser();
    
    //find post in DB*
    
    const post = await db.post.findUnique({
      where: {
        id: postId
      },
      include: {
        likes: true
      }
    })

    if(!post){
      return{
        error: "Post not found",
      };
    }

    // check if user has already liked the post or not 
    const like =  post.likes.find((like) => like.authorId === userId);

    // check if user has already liked it
    if(like){
      if (type === "like"){
        return{
          data: post 
        }
      }
    

    //otherwise delete the like 
    else {
      await db.like.delete({
        where:{
          id: like.id,
        },
      });
      console.log("like deleted")
    }}else{
      // if user is trying to unlike the post , return the post 
      if(type === "unlike"){
        return {
          data: post, 
        };
      }

      else {
        await db.like.create({
          data:{
            post: {
              connect: {
                id: postId
              }
            },
            author: {
              connect: {
                id: userId
              }
            }
          }
        });
        
      }
    };

    const updatedPost = await db.post.findUnique({
      where: {
        id: postId
      },
      include: {
        likes: true,
      },
    })

    return {
      data: updatedPost,
    }
  } catch (e) {
    console.log(e);
    throw new Error("Failed to Update Post Likes");
    
  }
};


export const addComment = async (postId, comment) => {

  const user = await currentUser()

  console.log("USER:", user?.id)

  if (!user?.id) {
    throw new Error("Not authenticated")
  }

  const newComment = await db.comment.create({
    data: {
      content: comment,
      post: { connect: { id: postId } },
      author: { connect: { id: user.id } }
    }
  })

  return { data: newComment }
}