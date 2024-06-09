import { FormEvent, useState } from "react";

function Form() {
  const [person, setPerson] = useState({ name: "", age: "" });
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    console.log(person);
  };
  /*
   * Note: Be on the lookout for performance issues if there are many form elements
   *       with onChange in the same view.
   */
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          onChange={(event) =>
            setPerson({ ...person, name: event.target.value })
          }
          value={person.name}
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          onChange={(event) =>
            setPerson({ ...person, age: event.target.value })
          }
          value={person.age}
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

export default Form;
