'use server'


export const createUser = async ({ user}) => {
    const {id, first_name, last_name, email, image_url, username} = user;
   try {

    const userExists = await db.user.findUnique({
        where: {
            id
        }
    });

    if (userExists) {
        updateUser(user);
        return;
    }   

    await db.user.create({
        data: {
            id,
            first_name,
            last_name,
            email,
            image_url,
            username
        }
    });



    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id, first_name, last_name, email, image_url, username
        }),
    });
   }catch (err) {
    console.error("Error creating user:", err);
}

export const updateUser = async (user) => {
    const {id, first_name, last_name, email, image_url, username} = user;

    try {
        user = await db.user.update({
            where: {
                id,
            },
            data: {
                first_name,
                last_name,
                email,
                image_url,
                username
            }
        }); console.log(`User with id ${id} updated successfully.`);

    }catch (err) {
        console.error("Error updating user:", err);
    }  
};

export const deleteUser = async (id) => { 
    try {
        await db.user.delete({
            where: {
                id,
            }
        }); console.log(`User with id ${id} deleted successfully.`);
    }catch (err) {
        console.error("Error deleting user:", err);
    } 
};


export const getUser=()=>{
    try{
        const user = db.user.findUnique({
            where: {
                id,
            }
        }); return user;
    }catch(err){ 
        console.error("Error fetching user:", err);
     }
}
