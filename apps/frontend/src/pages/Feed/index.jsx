import { CardPost } from "../../components/CardPost"
import styles from './feed.module.css'
import { useEffect, useState } from 'react'
import { http } from '../../api'

export const Feed = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        http.get('blog-posts')
            .then(response => setPosts(response.data))
            .catch(err => {
                console.error(
                    `Erro ao tentar retornar os dados de blog-posts: ${err.message}`
                )
            })
    }, [])

    return (
        <main className={styles.grid}>
            {posts.map(post => <CardPost key={post.slug} post={post} />)}
        </main>
    )
}