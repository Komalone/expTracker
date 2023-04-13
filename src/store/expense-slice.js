import { createSlice } from "@reduxjs/toolkit";

const initialExpState={
    items:[],
    activePremium: !!localStorage.getItem('active premium')
};

const ExpSlice=createSlice({
    name:'Expense',
    initialState:initialExpState,
    reducers:{
        addItemHandler(state,action){
            state.items=[action.payload]
            //console.log(action);
        },
        premiun(state){
            state.activePremium= true;
            localStorage.setItem("premium", true);
        },
        nonPremium(state){
            state.activePremium= false;
            localStorage.removeItem("premium");
        }
    }
});

export const expAction=ExpSlice.actions;
export default ExpSlice.reducer;