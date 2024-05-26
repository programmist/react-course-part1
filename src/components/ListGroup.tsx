function ListGroup() {
  const items = [
    { id: 1, city: "New York" },
    { id: 2, city: "London" },
    { id: 3, city: "Tokyo" },
    { id: 4, city: "Paris" },
    { id: 5, city: "Geneva" },
  ];

  // items = [];

  const handleClick = (city: string) => console.log(city);

  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No Items Found</p>}
      <ul className="list-group">
        {items.map(({ id, city }) => (
          <li
            key={id}
            onClick={() => handleClick(city)}
            className="list-group-item"
          >
            {city}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
