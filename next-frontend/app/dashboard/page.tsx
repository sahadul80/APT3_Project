import axios from "axios";
export default async function Dashboard() {
    const response = await axios.get('http://localhost:5000/student/posts');
    const jsondata = response.data;

    return (
        <div>
            {jsondata.length > 0 ? (
                <center>
                <ul>
                    {jsondata.map((post: any) => (
                        <li key={post.postId}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </li>
                    ))}
                </ul>
                </center>
            ) : (
                <center>
                    <p>No New Posts</p>
                </center>
            )}
        </div>
    );
}
