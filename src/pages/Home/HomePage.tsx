import React,{useState,useEffect} from 'react'
import {  Col, Row,Button } from 'antd';
import { Container } from 'react-bootstrap';
import SearchPerson from './components/SearchPerson';
import FilterPeople from './components/FilterPeople';
import People from './components/People';
import { Pagination } from 'antd';
import { ShareDataContext } from '../../ShareDataService/ShareDataService';
import { gql, useMutation,useQuery ,useLazyQuery } from '@apollo/client';
import { Person } from '../../models/Person';

import { TraceSpinner } from "react-spinners-kit";
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({

 spinner:{
   width: '100vw',
   height: '100vh',
   position: 'fixed',
   backgroundColor: '#000000e8',
   top: '0',
    left: '0',
    zIndex: '9999'
 }
})
const GET_PEOPLE = gql`
query GetAndFilter($gender: String, $mass: Int, $height: Int, $openText: String, $url: String) {
  getAndFilter(gender: $gender, mass: $mass, height: $height, openText: $openText, url: $url) {
    next
    previous
    results {
      name
      height
      gender
      homeworld
    }
  }
}
`;
function HomePage() {
  let person:Person={
    age:0,
    mass:0,
    height:0,
    gender:'',
    openText:''
  };
  const [searchDto,setSearchDto] = useState(person);
  const [getPeople,{loading, error, data}] = useLazyQuery (GET_PEOPLE);
  const [isClicked,setIsClicked] = useState(false);
  const [reset,setReset] = useState(false); // to reset the filter
  const [page,setPage] = useState(1);
  const classes = useStyles();
  useEffect(()=>{
    console.log(searchDto)
  },[searchDto])

  useEffect(()=>{
    
    getPeople({
      variables:{
        gender:"",
        mass:0,
        height:0,
        openText:"",
        url:""
      }
    })  
   
  },[])


  useEffect(()=>{
    if(isClicked){
    let dto =searchDto;
    dto['url'] = `https://swapi.dev/api/people/?page=${page}`;
    getPeople({
      variables:dto
    }).then(()=>{
      setIsClicked(false);
    }
    ) 
  
  
  }
  },[
    isClicked
  ])


  useEffect(()=>{

    if(reset){
      
      setSearchDto({
        gender:"",
        mass:0,
        height:0,
        openText:"",
        url:""});

        let dto ={
          gender:"",
          mass:0,
          height:0,
          openText:"",
          url:""};
        
        getPeople({
          variables:dto
        }).then(()=>{
          setReset(false);
        }
        ) 
      }


  },[reset])

  if (loading) return (<div className={`${classes.spinner} d-flex justify-content-center align-items-center`}>
  <div>
    <div className='d-flex justify-content-center '>
    <TraceSpinner size={30}/>
    </div>
  
   <div className='d-flex justify-content-center ' style={{color:"white"}}>
     loading ...
   </div>
  </div>
  
 </div>);
  if (error) return <h1>Submission error! {error.message}</h1>;
  const onSearch = () =>{
    // call graph ql for searching
  }


  const getAllPeople = () =>{
    //call graphql for all people
  }

  const onChangePage = (page:number,pageSize:number) =>{
    //call graphql for pagination
    setPage(page);
    let dto =searchDto;
    dto['url'] = `https://swapi.dev/api/people/?page=${page}`;
    getPeople({
      variables:dto
    }).then(()=>{
      setIsClicked(false);
    }
    ) 
  }
  return (
    <ShareDataContext.Provider value={{searchDto,setSearchDto}}>
      <Container>
      <Row gutter={16}>
        {/* <Col span={24} className={`d-flex justify-content-center my-5`}>
            <SearchPerson setIsClicked={setIsClicked}/>
        </Col> */}
        <Col span={24} className={`d-flex mt-5`}> 
          <FilterPeople setIsClicked={setIsClicked} setReset ={setReset}/>
        </Col>
      </Row>

      <People data={data}/>
      <Pagination
      style={{
        padding: '10px',
        background: '#4a5d7b',
        borderRadius: '0.25rem'
      }}
       defaultCurrent={page}
        total={82} 
        onChange ={onChangePage}  />
    </Container>
    </ShareDataContext.Provider>
   
  )
}

export default HomePage