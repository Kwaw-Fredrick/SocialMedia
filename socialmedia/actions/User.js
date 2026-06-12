'use server';

import { db } from "@/lib/db"; 

export const createUser = async ({ user }) => {
    const {
        id,
        first_name,
        last_name,
        email,
        image_url,
        username
    } = user;

    try {
        const userExists = await db.user.findUnique({
            where: {
                id
            }
        });

        if (userExists) {
            await updateUser(user);
            return;
        }

        await db.user.create({
            data: {
                id,
                first_name,
                last_name,
                email_address: email,
                image_url,
                username
            }
        });

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    first_name,
                    last_name,
                    email_address: email,
                    image_url,
                    username
                })
            }
        );

        if (!res.ok) {
            throw new Error("Failed API request");
        }

        console.log(`User ${id} created successfully`);

    } catch (err) {
        console.error("Error creating user:", err);
    }
};


export const updateUser = async (user) => {
    const {
        id,
        first_name,
        last_name,
        email_address: email,
        image_url,
        username
    } = user;

    try {
        const updatedUser = await db.user.update({
            where: {
                id
            },
            data: {
                first_name,
                last_name,
                email_address: email,
                image_url,
                username
            }
        });

        console.log(`User with id ${id} updated successfully.`);

        return updatedUser;

    } catch (err) {
        console.error("Error updating user:", err);
    }
};


export const deleteUser = async (id) => {
    try {
        await db.user.delete({
            where: {
                id
            }
        });

        console.log(`User with id ${id} deleted successfully.`);

    } catch (err) {
        console.error("Error deleting user:", err);
    }
};


export const getUser = async (id) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email_address: true,
                image_url: true,
                username: true,
                banner_url: true,
                created_at: true,
                updated_at: true,
                banner_id: true
            }
        });

        return user;

    } catch (err) {
        console.error("Error fetching user:", err);
    }
};