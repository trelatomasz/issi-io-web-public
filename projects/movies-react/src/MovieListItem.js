export default function MovieListItem(props) {
    return (
        <tr>
            <td>{props.movie.title}</td>
            <td>{props.movie.year}</td>
            <td>{props.movie.director}</td>
            <td></td>
            <td>{props.movie.description}</td>
            <td><a onClick={props.onDelete}>Delete</a></td>
        </tr>
    );
}
