import { useState } from "react";
import BackendApps from "./BackendApps";
import StateAndFormsApps from "./StateAndFormsApps";

const applications = [
  {
    value: "formState",
    description: "Form and State Apps",
    app: <StateAndFormsApps />,
  },
  { value: "backend", description: "Backend Apps", app: <BackendApps /> },
];

function App() {
  const [selectedApp, setSelectedApp] = useState(applications[1].value);

  return (
    <>
      <label>
        <h5>Choose Application:</h5>
      </label>
      <select
        className="form-select mb-5"
        onChange={(evt) => setSelectedApp(evt.target.value)}
        defaultValue={selectedApp}
      >
        {applications.map((state) => (
          <option key={state.value} value={state.value}>
            {state.description}
          </option>
        ))}
      </select>
      {applications.find((state) => state.value === selectedApp)!.app}
    </>
  );
}

export default App;
