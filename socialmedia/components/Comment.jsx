'use client'
import { SettingsContext } from '@/context/settings/settings-context'
import React, { useContext } from 'react'
import Box from './Box/Box'
import { Avatar, Flex, Typography } from 'antd'
import css from "../styles/post.module.css"
import dayjs from 'dayjs'

const Comment = ({ data }) => {
    const { settings: { theme } } = useContext(SettingsContext)
    console.log(theme);

    return (
        <Box>
            <Flex gap={"0.5rem"} className={css.comment}>
                <Avatar
                    size={30} src={data?.author?.image_url}
                />

                {/*person comment*/}

                <Flex vertical flex={1} gap={".5rem"}>
                    {/* name and date */}
                    <Flex>
                        {/* name */}
                        <Typography.Text>
                            {data?.author?.first_name} {data?.author?.last_name}
                        </Typography.Text>

                        {/* date */}
                        <Typography.Text type="secondary" className="typoCaption" strong>
                            {dayjs(data?.createdAt).format("DD MMM YYYY")}
                        </Typography.Text>
                    </Flex>

                    {/*comment text */}
                    <Typography.Text className="typeBody2">
                        {data?.content}
                    </Typography.Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Comment