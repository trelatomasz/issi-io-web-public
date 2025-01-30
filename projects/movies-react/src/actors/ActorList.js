import ActorListItem from "./ActorListItem";

export default function ActorList(props) {
    const actors = props.actors;

    return <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Origin</th>
            <th>Bio</th>
        </tr>
        </thead>
        <tbody>
        {actors.map((actor, index) =>
            <ActorListItem key={actor.id} actor={actor} onDelete={() => props.onDeleteActor(actor)}/>
        )}
        </tbody>
    </table>;
}