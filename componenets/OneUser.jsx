"use client";
import React, { useState } from "react";

const OneUser = ({ user, handleClickDeleteUser, setUsers}) => {
const 
    url = 'http://localhost:3000/users',
    [isEdit, setIsEdit] = useState(false),
    [editProfileData, setEditProfileData] = useState(user);

  const handleClickEditUser = async (e)=>{
    try{
      e.preventDefault();
      const responce = await fetch(`${url}/${user.id}`,{
        method:'PUT',
          body:JSON.stringify(editProfileData)
          
          
        }).then(res=>res.json())
        .then(res=>setUsers((prevState)=>prevState.map(element=>{
            if(res.id === element.id){
                return res;
            } 
            else{
                return element;
            }
                
        })));
        setIsEdit(false);

    }
    catch(e){
      console.error(e);

    }
  };

  return (
    <>
      {isEdit ? (
        <li key={user?.id}>
          <fieldset>
            <legend>
                User {user?.username} ({user?.id})
            </legend>
            Name: <input type="text" value={editProfileData.name} onChange={(event)=>setEditProfileData({...editProfileData, ["name"]:event.target.value})}/> <br />
            Email: <input type="text" value={editProfileData.email} onChange={(event)=>setEditProfileData({...editProfileData, ["email"]:event.target.value})} /> <br />
            Phone: <input type="text" value={editProfileData.phone} onChange={(event)=>setEditProfileData({...editProfileData, ["phone"]:event.target.value})}/> <br />
              Address: <input type="text" value={editProfileData.address.street} onChange={(event)=>setEditProfileData({...editProfileData, address:{...editProfileData.address, ["street"]:event.target.value}})}/>,

              <input type="text" value={editProfileData.address.suite} onChange={(event)=>setEditProfileData({...editProfileData, address:{...editProfileData.address, ["suite"]:event.target.value}})} />,

              <input type="text" value={editProfileData.address.city} onChange={(event)=>setEditProfileData({...editProfileData, address:{...editProfileData.address, ["city"]:event.target.value}})}/>
              
              zipcode: <input type="text" value={editProfileData.address.zipcode} onChange={(event)=>setEditProfileData({...editProfileData, address:{...editProfileData.address, ["zipcode"]:event.target.value}})}/>
            <br />
            <button onClick={() => handleClickDeleteUser(user.id)}>
              Del ❌
            </button>
            <button onClick={(e) => handleClickEditUser(e)}>Save✏️</button>
          </fieldset>
        </li>
      ) : (
        <li key={user?.id}>
          <fieldset>
            <legend>
              User {user?.username} ({user?.id})
            </legend>
            Name: {user?.name} <br />
            Email:{user?.email} <br />
            Phone: {user?.phone} <br />
            <span title={user?.address?.zipcode}>
              Address: {user?.address?.city}, {user?.address?.street},
              {user?.address?.suite}
            </span>
            <br />
            <button onClick={() => handleClickDeleteUser(user.id)}>
              Del ❌
            </button>
            <button onClick={() => setIsEdit(true)}>Edit✏️</button>
          </fieldset>
        </li>
      )}
    </>
  );
};

export default OneUser;
