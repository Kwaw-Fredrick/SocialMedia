"use client"

import React, { useState } from 'react'
import css from '@/styles/postGenerator.module.css'
import Box from './Box/Box'
import { Avatar, Button, Flex, Typography } from 'antd'
import { useUser } from '@clerk/nextjs'
import Input from 'antd/es/input/Input'
import { Icon } from '@iconify/react'

const PostGenerator = () => {
    const {user} = useUser();
    const [postText, setPostText] = useState("");
    const imgInputRef = React.useRef(null);
    const vidInputRef = React.useRef(null)
  return (
    <>
    <div className="css.postGenWrapper">
        <Box className={css.container}>
            {/*top side */}
            <Flex vertical gap={'1rem'} align='flex-start'>
            <Flex   style={{width: "100%"}} gap={"1rem"}>
                <Avatar src={user?.imageUrl}
                style={{
                    width: "2.6rem",
                    height: "2.6rem",
                    boxShadow: "var(--avatar-shadow)"
                }}
                />

                <Input.TextArea
                placeholder="Share what you are thinking......"
                style={{height: 80, resize: "none", flex: "1 "}}
                value={postText}
                onChange={(e)=>setPostText(e.target.value)}
                />
                
            </Flex>

            {/*bottom button*/}
            <Flex className={css.bottom}
            align='center' justify='space-between'
            >
                <Button type="text" style={{background:"borderColor"}}> 
                    <Flex 
                    align='center'
                    gap={"0.5rem"}
                    >
                        <Icon 
                        icon={"solar:camera-linear"}
                        width={"1.2rem"}
                        color="var(--primary)"
                        />
                        <Typography className="typoSubtitle2">Image</Typography>
                    </Flex>
                </Button>

                {/*video upload button*/}
                <Button type="text" style={{background:"borderColor"}}> 
                    <Flex align='center'gap={"0.5rem"}>
                        <Icon 
                        icon="lucide:video"
                        width={"1.2rem"}
                        color="#5856D6"
                        />
                        <Typography className="typoSubtitle2">Video</Typography>
                    </Flex>
                </Button>
                {/*post Button*/}
                <Button type='primary' style={{marginLeft: "auto"}}>
                    <Flex align='center' gap={'0.5rem'}>
                        <Icon 
                        icon="iconamoon:send-fill" 
                        width={'1.2rem'}
                        />
                        <Typography className="typoSubtitle2" style={{color: "white"}}>
                            Post
                        </Typography>
                    </Flex>
                </Button>
            </Flex>
            </Flex>
        </Box>
    </div>

    {/*hidden Button*/}
    {/*button to accept image file*/}
    <input 
    type="file" 
    accept='image/*' 
    multiple={false} 
    style={{display: "none"}}

    ref={imgInputRef}
    />
    </>
  )
}

export default PostGenerator