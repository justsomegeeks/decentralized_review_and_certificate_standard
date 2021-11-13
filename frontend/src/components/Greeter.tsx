import React, { ReactElement } from "react";
import { useGreeter } from "../context/GreeterContext";
import { joinClasses } from "../helpers";
import Button from "./Button";
import InputField from "./InputField";

export default function Greeter(): ReactElement {
  const { greeting, updateGreeting } = useGreeter();
  const [newGreeting, setNewGreeting] = React.useState("");

  React.useEffect(() => {
    setNewGreeting("");
  }, [greeting]);

  const handleUpdateGreeting = () => {
    if (greeting.length < 1) {
      alert("New greeting cannot be empty!");
    }
    if (updateGreeting) {
      updateGreeting(newGreeting);
    }
  };

  return (
    <div className="w-full mt-10">
      <h1 className="text-2xl">{greeting}</h1>
      <div className={joinClasses("flex", "items-center", "flex-col")}>
        <div>
          <InputField
            type="text"
            placeholder="new greeting message"
            value={newGreeting}
            onChange={(e) => setNewGreeting(e.target.value)}
          />
        </div>
        <Button color="primary" onClick={handleUpdateGreeting} className="mt-2">
          Change Greeting
        </Button>
      </div>
    </div>
  );
}
