import React,{useState,useContext} from 'react';
import {  Col, Row,Button,Slider  } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createUseStyles} from 'react-jss';
import { Checkbox } from 'antd';
import { Radio } from 'antd';

import { Space } from 'antd';
import { PoweroffOutlined ,FilterOutlined} from '@ant-design/icons';
import { ShareDataContext } from '../../../ShareDataService/ShareDataService';

const useStyles = createUseStyles({
  
  person:{
    boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
    borderRadius: '0.25rem',
    backgroundColor: 'rgb(74 93 123)',
    color:'rgb(0, 0, 0)',
    padding:'10px',
    width:'100%',
    minHeight:'100px',
  },
  search:{
    width: '434px'
  },

})

function FilterPeople(props: { setIsClicked:React.Dispatch<React.SetStateAction<any>>,setReset:React.Dispatch<React.SetStateAction<any>> }) {
  const classes = useStyles();
  const {setIsClicked,setReset} = props;
  const {searchDto,setSearchDto} = useContext(ShareDataContext);
  const [radio, setRadioValue] = useState('all');

  const onChange = (e:any) => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
    setSearchDto({
      ...searchDto,
      gender:e.target.value
    });
  };

  const onChangeAge = (value: number ) => {

    setSearchDto({
      ...searchDto,
      age:value
    });
  }
  const onChangeMass = (value: number ) => {
    setSearchDto({
      ...searchDto,
      mass:value
    });
  }

  return (
    <div className={`${classes.person}`}>
    
    <Row gutter={16}  className={`${classes.search}`}>
        
        <Col xs={24} sm={24} md={12} lg={6} span={6} className='mt-2'>
          <div>Mass</div>
          <Slider defaultValue={0}  max={1000} tooltipPlacement={'bottom'} onChange={onChangeMass}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6} span={6} className='mt-2'>
          <div>Gender</div>
          <Radio.Group onChange={onChange} className ="d-flex">

          <Radio value={''} ><span color='white'>All</span></Radio>
        <Radio value={'male'} ><span color='white'>Male</span></Radio>
        <Radio value={'female'}><span color='white'>Female</span></Radio>
        <Radio value={'other'}><span color='white'>Unknown</span></Radio>
      </Radio.Group>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}  className='mt-3'>
         
        <Button
           shape="round"
           type="primary" ghost
           style={{borderColor:' #1a3147',color:'#1a3147'}}
            size="small"
            onClick={()=>{
              setIsClicked(true);
            }}
          >
            Filter
          </Button>
          <Button
          className='mx-3'
          shape="round"
          type="primary" ghost
          style={{borderColor:' #1a3147',color:'#1a3147'}}
            size="small"
            onClick={()=>{
              
              window.location.reload();
            }}
          >
            Reset
          </Button>
        </Col>
    </Row>
  
    </div>
  )
}

export default FilterPeople
