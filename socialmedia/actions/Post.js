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