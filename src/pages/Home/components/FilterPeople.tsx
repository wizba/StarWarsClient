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
    backgroundColor:'white',
    padding:'10px',
    width:'100%',
    minHeight:'100px',
  },
  search:{
    width: '434px'
  },

})

function FilterPeople() {
  const classes = useStyles();

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
    <div className={`${classes.person} d-flex justify-content-center`}>
    
    <Row gutter={16}  className={`${classes.search}`}>
        <Col xs={24} sm={24} md={12} lg={6} span={6} className='mt-2'>
          <div>Age</div>
          <Slider defaultValue={0}    tooltipPlacement={'bottom'} onChange={onChangeAge}/>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} span={6} className='mt-2'>
          <div>Mass</div>
          <Slider defaultValue={0}   tooltipPlacement={'bottom'} onChange={onChangeMass}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6} span={6} className='mt-2'>
          <div>Gender</div>
          <Radio.Group onChange={onChange}>

          <Radio value={''} >All</Radio>
        <Radio value={'male'} >Male</Radio>
        <Radio value={'female'}>Female</Radio>
        <Radio value={'other'}>Unknown</Radio>
      </Radio.Group>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}  className='mt-3'>
         
        <Button
            type="primary"
            icon={<FilterOutlined />}
            size="small"
          >
            Filter
          </Button>
            
        </Col>
    </Row>
  
    </div>
  )
}

export default FilterPeople
