export default function ActorListItem(props) {
    return (
        <tr>
            <td>{props.actor.name}</td>
            <td>{props.actor.age}</td>
            <td>{props.actor.sex}</td>
            <td>{props.actor.origin}</td>
            <td>{props.actor.bio}</td>
            <td><a onClick={props.onDelete}>Delete</a></td>
        </tr>
    );
}
