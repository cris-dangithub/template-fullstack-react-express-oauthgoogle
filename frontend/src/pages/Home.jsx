import React, { useEffect } from "react";
// import { users } from "../lib/mocks/user.mocks";
import Card from "../components/Card/Card";
import { useUsers } from "../lib/services/user.service";
import useTitle from "../lib/hooks/useTitle";

const Home = () => {
  const { data: users, error, isLoading } = useUsers();
  console.log({ users, error, isLoading });

  useTitle("Home");
  return (
    <div className="home">
      <section className="home__card-container">
        <h2 className="home__title">Lista de usuarios registrados</h2>
        {users?.users.map((user) => (
          <Card key={user.username} user={user} />
        ))}
      </section>
    </div>
  );
};

export default Home;
