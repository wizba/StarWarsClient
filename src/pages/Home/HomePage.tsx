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


  if (loading) return <h1>Submitting...</h1>;
  if (error) return <h1>Submission error! {error.message}</h1>;
  const onSearch = () =>{
    // call graph ql for searching
  }


  const getAllPeople = () =>{
    //call graphql for all people
  }

  const onChangePage = (page:number,pageSize:number) =>{
    //call graphql for pagination
  }
  return (
    <ShareDataContext.Provider value={{searchDto,setSearchDto}}>
      <Container>
      <Row gutter={16}>
        <Col span={24} className={`d-flex justify-content-center my-5`}>
            <SearchPerson/>
        </Col>
        <Col span={24} className={`d-flex`}> 
          <FilterPeople/>
        </Col>
      </Row>

      <People data={data}/>
      <Pagination defaultCurrent={1} total={82} onChange ={onChangePage}  />
    </Container>
    </ShareDataContext.Provider>
   
  )
}

export default HomePage