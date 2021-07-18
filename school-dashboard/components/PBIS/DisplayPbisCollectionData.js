export default function DisplayPbisCollectionData({ CollectionData }) {
  return (
    <div>
      <h3>Stats at last collection: {CollectionData.name}</h3>
      <p>{JSON.stringify(CollectionData)}</p>
    </div>
  );
}
