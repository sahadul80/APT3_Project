
export default function Id({
    params }: {
        params: {
            id: string
        }
    }) {
    return (<div>id: { params.id }</div>);
}