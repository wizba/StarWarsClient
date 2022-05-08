import React,{useContext,ChangeEvent} from 'react'
import { Input } from 'antd';

import {createUseStyles} from 'react-jss';
import { ShareDataContext } from '../../../ShareDataService/ShareDataService';

const useStyles = createUseStyles({
  search:{
    width: '434px'
  },
  })
  const { Search } = Input;
function SearchPerson() {
    const classes = useStyles();
    const {searchDto,setSearchDto} = useContext(ShareDataContext);
    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
      console.log('radio checked', e.target.value);
      setSearchDto({
        ...searchDto,
        openText:e.target.value
      });
    }
  return (
    <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
             
             onChange={onChange}
            className={`my-3 ${classes.search}`}
          />
  )
}

export default SearchPerson;