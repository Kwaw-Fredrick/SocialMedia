'use client'

import { Icon } from '@iconify/react/dist/iconify.js';
import css from '@/styles/CommentSection.module.css'
import { Button, Flex } from 'antd';
import React from 'react'
import CommentInput from './CommentInput';

const CommentSection = ({comments, postId, queryId}) => {
    const [expanded, setExpanded] = React.useState(false);
  return (
      <Flex vertical gap={'1rem'}>
         <>
        {/*show more buttons*/}

        {
            comments?.length > 1 && (
                <Button type='text' onClick={() => setExpanded((prev) =>  !prev )} >
                <Flex>
                    <Icon icon="ic:outline-expand-more"/>
                    Show more comments 
                </Flex>
            </Button>
           )
        }
        {/* comments */}
        {
            
            comments?.length > 0 && (
                <Flex vertical gap={'0.5rem'} className={css.commentsContainer}>
                    {
                        !expanded ? (
                            <span>Not expanded</span>
                        ) : (
                            comments.map((comments, index) =>(
                                <span key={index}>Expanded comments</span>
                            ))
                        )
                    }
                
            </Flex>
        )
    }
    </>

    {/*comments input*/}
    <CommentInput queryId={queryId} postId />
     </Flex>
  )
} 

export default CommentSection