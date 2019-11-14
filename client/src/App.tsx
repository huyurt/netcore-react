import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";

const App: React.FC = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/values").then(response => {
      console.log(response);
      setValues(response.data);
    });
  }, []);

  return (
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Uygulama</Header.Content>
      </Header>
      <List>
        {values.map((value: any) => (
          <List.Item key={value.id}>{value.name}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
