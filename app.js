import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from "react";


function App() {
  const [data, setData] = React.useState(null);
  const [text,setText]=React.useState('')

  React.useEffect(() => {
    getStatus()
   
    
    })
  
     
    const getStatus=async()=>{
      const res=await fetch("http://localhost:8081/status");
      console.log("Res--->",res)
      if(res){
      const data=await res.json();
      setData(data)
      }
    

    }
    console.log("data-->",data);
    var statusArr=[]
    const arr=[{
      "title":"Have a wonderful day"
    },
    {
      "title":"Good day"
    },
    {
      "title":"Have a wonderful day"
    },
    {
      "title":"Have a wonderful day"
    }]
    statusArr= arr.map(ele=>{
      return(
        <div style={{marginTop:10,height:30,alignItems:'center', display:'flex',flexDirection:'row'}}>
          <div style={{flex:0.6}}>
          {ele.title}

          </div>
          <div style={{flex:0.4}}>
          <button 
          onClick={()=>{
           
          
            const res=  fetch("http://localhost:8081/deletestatus", {
              method: "POST", 
              body: JSON.stringify({"id": ele.id}),
              headers: {  'Accept': 'application/json',
              'Content-Type': 'application/json' }
            }).then(res => {
              console.log("Request complete! response:", res);
              alert("Tweet Successfully tweeted!!")
            }).catch(err=>{
              console.log("Err",err);
            })
         }}
          
          style={{
            width:'15%',backgroundColor:'#1DA1F2',color:'white',fontWeight:"bold",fontSize:14,borderColor:'transparent',borderRadius:8
          }}>DELETE</button>

          </div>
       
        </div>
      )
 
     })
  //   if(data && data.length>0){
     

  //  statusArr= data.map(ele=>{
  //    return(
  //      <div style={{marginVertical:30,borderBottomWidth:1,borderColor:'#808080'}}>
  //        {ele.text}
  //      </div>
  //    )

  //   })
  // }
  console.log("text-->",text,typeof(text))
      
  
  

  return (
    <div className="App" style={{flex:1,marginRight:10,marginLeft:10}}>
     <div>
       Twitter App
       <div style={{marginTop:10,display:'flex',flexDirection:'column'}}>
       <input
       style={{height:100,width:'60%',borderRadius:10,alignSelf:'center'}}
            type="text"
            //value={text}
            onChange={(e)=>{
              setText(e.target.value)
            }}
         />
         <button 
         disabled={text.length<1}
         style={{width:'10%',alignSelf:'flex-end',height:40,backgroundColor:'#1DA1F2',color:'white',fontWeight:"bold",fontSize:20,borderColor:'transparent',borderRadius:8,marginTop:10,marginRight:'15%'}}
         onClick={()=>{
           console.log("alert")
          
            const res=  fetch("http://localhost:8081/poststatus", {
              method: "POST", 
              body: JSON.stringify({"title": text}),
              headers: {  'Accept': 'application/json',
              'Content-Type': 'application/json' }
            }).then(res => {
              console.log("Request complete! response:", res);
              console.log("res.json",res.json())
            }).catch(err=>{
              console.log("Err",err)
            })
         }}>POST</button>
       </div>
       <div>
         {statusArr}
         
       </div>
     </div>
    </div>
  );
}

export default App;
