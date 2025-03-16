import { useEffect, useState} from 'react';
import {Button, EditableText,InputGroup} from '@blueprintjs/core';
import './App.css'











function App() {
  const [users,setUsers] = useState([]);
  const [newName,setnewName] = useState("");
  const [newEmail,setnewEmail] = useState("");
  const [newWebsite,setnewWebsite] = useState("");
  



  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    //* response.json la eruku ra data va adutha .then la vaangalam.
    .then((json)=> setUsers(json))
    //*[] because one time namaku show pannaum so adhukula[]edhu podala 
  },[])
  




  function onChangeHandler(id  ,key , value){
    setUsers((users)=>{
    return users.map((user)=>{
      //user.id apdi na json la default aa irukura names...adha namma kudukura id ku same aa irundha update aagum 
//[key] means website or email or name a change pannum..
      return user.id === id? {...user, [key]: value} : user;
    })

    })
  }
//naama change pandrapo dhan setusers kupuduvom..idhu update dhan panudhu so no need to use setuser here..

  function updateChange(id){
    const user = users.find((user)=>
    
      user.id === id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
          method : "PUT",
          body:JSON.stringify(
               //json Form la maathurom..so we use stringfy
          user),
          headers:{ //namma anupuradhu json data nu server ku soldrom ..so we use header property..
              "Content-Type" : "application/json;Charset=UTF -8"//encoding format la anupurom
          }

      }).then(response => response.json())
      .then(data=>{
       setUsers([...users,data])
        
        


      })
    }
    


  
  function adduser(){
//trim -> name length aa irundha trim pannum ..
    const name = newName.trim();
    const Email = newEmail.trim();
    const Website = newWebsite.trim();



    
    if(name&&Email&&Website){  //name emai website ulla irndha indha vishyatha pannu..
      fetch('https://jsonplaceholder.typicode.com/users',
          {
              method : 'POST',
              body: JSON.stringify({
                name,
                email: Email,
                website: Website,
              }),
              
                
                //json Form la maathurom..so we use stringfy
              
              headers:{ //namma anupuradhu json data nu server ku soldrom ..so we use header property..
                  "Content-Type" : "application/json;Charset-UTF =8"//encoding format la anupurom
              }

          }

      ).then((response)=> response.json())//text ta dha varum  naama json data va convert pandrom json vandhu response endra perla vaangi..another then la stroe pannikudhu
      .then(data =>{
      
          setUsers([...users,data]);
          
          


      })
      // inni andha user table naama new users add pandrom..so we call setuser..
      
      setnewName("");
      setnewEmail("");
      setnewWebsite("");
  }

  }

    function deleteUser(id){
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method : 'DELETE',
        }
      )
      .then(response => response.json())
      .then(data =>{
        setUsers((users)=> users.filter(user =>user.id !== id))
       
        
        
        
  
      })
     




    }
  
  //return must be outside of the funtion
 
return(
 

    
      <div className='App'>
       

        <table className='bp4-html-table modifier'>
          <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>website</th>
            <th>
              Action
            
             </th>
             </tr>
          </thead>
          
          <tbody>

         

           

          {users.map(user =>
          <tr key={user.id}>
            
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td><EditableText onChange={(value)=>onChangeHandler(user.id,'email',value)}value={user.email}/></td>
          <td><EditableText onChange={(value)=>onChangeHandler(user.id,'website',value)}value={user.website}/></td>
          <td>
            <Button intent='primary'onClick={()=>updateChange(user.id)}>Update</Button>
          <Button intent='danger' onClick={()=>deleteUser(user.id)}>Delete</Button>
          </td>
          </tr>

          )}
          
            
          

         </tbody>
         <tfoot>
            <tr>
                <td></td>
    
            <td><InputGroup 
            value = {newName}
            onChange = {(e)=> setnewName(e.target.value)}
            placeholder = "Enter name..."/>
            </td>
            <td><InputGroup 
            value = {newEmail}
            onChange = {(e)=> setnewEmail(e.target.value)}
            placeholder = "Enter email..."/>
            </td>
            <td><InputGroup 
            value = {newWebsite}
            onChange = {(e)=> setnewWebsite(e.target.value)}
            placeholder = "Enter website..."/>
            </td>
            <td>
                <Button intent = "success" onClick={adduser}>Add user</Button>
            </td>


            </tr>
            </tfoot>
         </table>
        
       

      </div>
   //* anga json folder la enna alphabets iruko eg: capital name mean {user.Nmae} nu dha podanaum.small letter la irundha small la dhan podanum.  
    //* intent means colors kudukom. danger na red.primary means blue.
    //* EditableText means we can edit that.
  
        )
      }
        
        
export default App
  
