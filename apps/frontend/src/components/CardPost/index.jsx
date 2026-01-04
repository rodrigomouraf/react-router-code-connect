import { Author } from "../Author"
import styles from './cardpost.module.css'

import { ThumbsUpButton } from "./ThumbsUpButton"
import { ModalComment } from "../ModalComment"
import { Link } from "react-router"

import { useAuth } from "../../hooks/useAuth"
import { usePostInteractions } from '../../hooks/usePostInteractions'
import { useEffect } from "react"

export const CardPost = ({ post }) => {
    const { comments, likes, initializeLikes, initializeComments, handlePostsLike, handleNewComment } = usePostInteractions()

    useEffect(() => {
        initializeLikes(post.likes)
        initializeComments(post.comments)
    }, [post])

    const { isAuthenticated } = useAuth()

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <figure className={styles.figure}>
                    <img
                        src={post.cover}
                        alt={`Capa do post de titulo: ${post.title}`}
                    />
                </figure>
            </header>
            <section className={styles.body}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <Link to={`/blog-post/${post.slug}`}>Ver detalhes</Link>
            </section>
            <footer className={styles.footer}>
                <div className={styles.actions}>
                    <div className={styles.action}>
                        <ThumbsUpButton loading={false} onClick={() => handlePostsLike(post.id)} disabled={!isAuthenticated} />
                        <p>
                            {likes}
                        </p>
                    </div>
                    <div className={styles.action}>
                        <ModalComment onSuccess={handleNewComment} postId={post.id}/>
                        <p>
                            {comments.length}
                        </p>
                    </div>
                </div>
                <Author author={post.author} />
            </footer>
        </article>
    )
}