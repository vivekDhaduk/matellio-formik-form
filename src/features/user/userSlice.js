import { createSlice } from "@reduxjs/toolkit";

const DummyData = [
  {
    id: 1,
    firstName: "vivek",
    lastName: "dhaduk",
    email: "dhaduk1000vivek@gmail.com",
    phoneNumber: 9510542252,
    dateOfBirth: "2002-03-21",
    gender: "male",
    state: "Gujarat",
    postalCode: "395006",
    country: "India",
    streetAddress: "76, bhid bhanjan socity, nana varachha road",
    city: "surat",
  },
  {
    id: 2,
    firstName: "test",
    lastName: "demo",
    email: "test@gmail.com",
    phoneNumber: 9510542252,
    dateOfBirth: "2002-03-21",
    gender: "male",
    state: "Gujarat",
    postalCode: "123456",
    country: "India",
    streetAddress: "123, Abc apartment",
    city: "Ahemdabad",
  },
];

const initialState = {
  users: DummyData,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions;

export default userSlice.reducer;
