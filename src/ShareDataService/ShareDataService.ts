

import {  createContext } from "react";


export const ShareDataContext =createContext({
    searchDto:{},
    setSearchDto:(val:any)=>val,
    
});

