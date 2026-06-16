import { Icon } from '@iconify/react/dist/iconify.js'
import { Button, Flex, Typography } from 'antd'
import React from 'react'

const CommentButton = ({comments}) => {
  return (
   <Button>
    <Flex gap={'0.5rem'} align= 'center'>
        <Icon
         icon="iconamoon: comment-dots-fill"
         width={"21"}
         color='grey'
        />
        <Typography.Text>
            {comments > 0? `${comments} Comments` : "Comment" }
        </Typography.Text>
    </Flex>
   </Button>
  )
}

export default CommentButton