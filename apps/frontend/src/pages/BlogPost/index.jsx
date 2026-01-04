import styles from './blogpost.module.css'
import { ThumbsUpButton } from "../../components/CardPost/ThumbsUpButton"
import { ModalComment } from "../../components/ModalComment"
import { Author } from "../../components/Author"
import Typography from "../../components/Typography"
import { CommentList } from "../../components/CommentList"
import ReactMarkdown from 'react-markdown'
import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { http } from '../../api'
import { usePostInteractions } from '../../hooks/usePostInteractions'

export const BlogPost = () => {

    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const { comments, likes, initializeComments, initializeLikes, handleDelete, handleNewComment, handlePostsLike } = usePostInteractions()

    useEffect(() => {
        http.get(`blog-posts/slug/${slug}`)
            .then(response => {
                setPost(response.data)
                initializeComments(response.data.comments)
                initializeLikes(response.data.likes)
            })
            .catch(error => {
                if (error.status == 404)
                    return navigate('/not-found')

                console.error(
                    `Erro ao tentar retornar os dados de blog-posts: ${error.message}`
                )
            })

    }, [navigate, slug])

    if (!post) {
        return null
    }

    return (
        <main className={styles.main}>
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
                </section>
                <footer className={styles.footer}>
                    <div className={styles.actions}>
                        <div className={styles.action}>
                            <ThumbsUpButton onClick={() => handlePostsLike(post?.id)} loading={false} />
                            <p>
                                {likes}
                            </p>
                        </div>
                        <div className={styles.action}>
                            <ModalComment onSuccess={handleNewComment} postId={post?.id} />
                            <p>
                                {comments.length}
                            </p>
                        </div>
                    </div>
                    <Author author={post.author} />
                </footer>
            </article>
            <Typography variant="h3">Código:</Typography>
            <div className={styles.code}>
                <ReactMarkdown>
                    {post.markdown}
                </ReactMarkdown>
            </div>
            <CommentList comments={comments} onDelete={handleDelete} />
        </main>
    )
}