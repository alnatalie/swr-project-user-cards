"use client";
import React, { useEffect, useState } from "react";
import classes from "./UserList.module.css";
import OneUser from "./OneUser";
import toast from 'react-hot-toast';

const url = "http://localhost:3000/users";
const ExapleUser = {
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

const UserList = () => {
  const [users, setUsers] = useState([]),
    [newUserData, setNewUserData] = useState(ExapleUser);

  const handleClickDeleteUser = async (id) => {
    try {
      const responce = await fetch(`${url}/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((res) => res);
      setUsers(users.filter((user) => user.id != responce.id));
      toast.success('The user has been deleted');
    } catch (e) {
      toast.error(e)
    }
  };

  const handleClickAddUser = async (event) => {
    try {
      event.preventDefault();
      const responce = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(newUserData),
      })
        .then((res) => res.json())
        .then((res) => setUsers((prevState) => [res, ...prevState]));
      setNewUserData(ExapleUser);
      toast.success(`User Add!`);
    } catch (e) {
      toast.error("This didn't work.")
      console.error(e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const responce = await fetch(url)
          .then((res) => res.json())
          .then((res) => res);
        console.log(responce);
        setUsers(responce);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <fieldset className={classes.UserList}>
        <h2>Add New User</h2>
        <label htmlFor="">Name: </label>
        <input
          type="text"
          value={newUserData.name}
          onChange={(event) =>
            setNewUserData({ ...newUserData, ["name"]: event.target.value })
          }
        />{" "}
        <br />
        <label htmlFor="">Email: </label>
        <input
          type="text"
          value={newUserData.email}
          onChange={(event) =>
            setNewUserData({ ...newUserData, ["email"]: event.target.value })
          }
        />
        <br />
        <label htmlFor="">Phone: </label>
        <input
          type="text"
          value={newUserData.phone}
          onChange={(event) =>
            setNewUserData({ ...newUserData, ["phone"]: event.target.value })
          }
        />
        <br />
        <div>
          <span>Addres</span>
          <br />
          <label htmlFor="">Street: </label>
          <input
            type="text"
            value={newUserData.address.street}
            onChange={(event) =>
              setNewUserData({
                ...newUserData,
                address: {
                  ...newUserData.address,
                  ["street"]: event.target.value,
                },
              })
            }
          />
          <br />
          <label htmlFor="">Suite: </label>
          <input
            type="text"
            value={newUserData.address.suite}
            onChange={(event) =>
              setNewUserData({
                ...newUserData,
                address: {
                  ...newUserData.address,
                  ["suite"]: event.target.value,
                },
              })
            }
          />
          <br />
          <label htmlFor="">City: </label>
          <input
            type="text"
            value={newUserData.address.city}
            onChange={(event) =>
              setNewUserData({
                ...newUserData,
                address: {
                  ...newUserData.address,
                  ["city"]: event.target.value,
                },
              })
            }
          />
          <br />
          <label htmlFor="">zipcode: </label>
          <input
            type="text"
            value={newUserData.address.zipcode}
            onChange={(event) =>
              setNewUserData({
                ...newUserData,
                address: {
                  ...newUserData.address,
                  ["zipcode"]: event.target.value,
                },
              })
            }
          />
          <br />
        </div>
        <button onClick={handleClickAddUser}>Add➕</button>
      </fieldset>
      <ul>
        {users.map((user) => (
          <OneUser
            user={user}
            handleClickDeleteUser={handleClickDeleteUser}
            setUsers={setUsers}
          />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
