import { useState, useEffect } from 'react'
import { http } from '../api'

export const usePostInteractions = () => {
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState(null)

    const initializeComments = (comments) => {
        setComments(comments)
    }

    const initializeLikes = (likes) => {
        setLikes(likes)
    }

    const handlePostsLike = (postId) => {
        http.post(`blog-posts/${postId}/like`)
            .then(() => {
                setLikes(oldState => oldState + 1)
            })
    }

    const handleNewComment = (comment) => {
        setComments(prev => [comment, ...prev])
    }

    const handleDelete = (commentId) => {
        const isConfirmed = confirm('Tem certeza que deseja remover o comentário?')
        if (isConfirmed) {
            http.delete(`comments/${commentId}`)
                .then(() => {
                    setComments(oldComments => oldComments.filter(comment => comment.id !== commentId))
                })
        }
    }

    const handleEdit = (newComment) => {
        setText(newComment.text)
    }

    return {
        comments,
        likes,
        initializeComments,
        handleNewComment,
        handleDelete,
        handleEdit,
        initializeLikes,
        handlePostsLike
    }
}