import React, { useState, useEffect } from 'react'
import { Col, Row, Button, Drawer } from 'antd';
import { createUseStyles } from 'react-jss';
import { gql,useLazyQuery } from '@apollo/client';

const useStyles = createUseStyles({

  person: {
    boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
    borderRadius: '0.25rem',
    backgroundColor: 'white',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  person_number: {
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    border: '1.5px solid #04b67d',
    color: '#04b67d',
  },
  view_button: {
    boxShadow: 'none',
    margit: 'auto',
  },
  nameNumberCover: {
    width: '80%',
  },
  homeWorld:{
    border: '1.5px solid #04b67d',
    borderRadius: '10px'
    
  }

})


function People(props: { data: any; }) {

  const classes = useStyles();
  const [people, setPeople] = useState([]);
  const { data } = props;
  const [visible, setVisible] = useState(false);
  const [person, setPerson] = useState({});
  const showDrawer = () => {
    setVisible(true);
  };
  useEffect(() => {

    if (data) {
      console.log(data);
      const { results } = data.getAndFilter;
      console.log(results)
      setPeople(results);
    }
  }, [])




  return (
    <Row gutter={16} className={`pb-5`}>

      {

        people.map((person: any, index: number) =>
          <Col xs={24} sm={24} md={12} lg={6} span={6} className='mt-4'>
            <div className={`${classes.person}`}>
              <div className={`d-flex ${classes.nameNumberCover}`}>
                <div className={`${classes.person_number}`}>{index+1}</div>
                <div className='mx-2'>{person.name}</div>
              </div>

              <Button type="primary" size="small" ghost className={`${classes.view_button}`} onClick={()=>{
                setPerson(person);
                showDrawer()
                }}>
                View
              </Button>
            </div>
          </Col>
        )

      }


      <PersonInfo visible={visible} setVisible={setVisible} person={person}/>
    </Row>
  )
}

export default People;


const GET_HOME_WORLD = gql`
query GetHomeWorld($url: String) {
  getHomeWorld(url: $url) {
    name
    rotation_period
    orbital_period
    diameter
    gravity
    climate
    population
    terrain
  }
}
`
const PersonInfo = (props: { visible: boolean; setVisible: any ,person:any}) => {
  const { visible, setVisible,person } = props;
  const [homeWorld, setHomeWorld] = useState({});
  const classes = useStyles();
  const [getHomeWorld,{loading, error, data}] = useLazyQuery (GET_HOME_WORLD);

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if(person){
      if(person.homeworld)
      getHomeWorld({variables:{
        url:person.homeworld
      }})
      setHomeWorld(person.homeworld);
    }
      
  },[person]);

  if (loading) return <h1>Submitting...</h1>;
  if (error) return <h1>Submission error! {error.message}</h1>;
  return (
    <>

      <Drawer title="Cast Information" placement="right" onClose={onClose} visible={visible}>
        {Object.keys(person).map((key: string, index: number) => {
          return<>{            
            (key !== 'homeworld' && key !=='__typename') &&
          <div>
              <span>{key} </span>: <span>{person[key]}</span>
          </div>}
         
          </>
        }
          )
        }

<div className={`${classes.homeWorld} p-3 mt-3`}>
            Home world
          </div>
       
      </Drawer>
    </>
  );
}