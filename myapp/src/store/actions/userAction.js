import axios from "axios";

import {
  SET_LOADER,
  CLOSE_LOADER,
  REGISTER_ERRORS,
  LOGIN_ERROR,
  SAVING_DATA,
  REGISTER_SUCESSFULL,
  LOGIN_SUCCESFULL,
} from "../types/UsetTypes";
// import { useDispatch } from "react-redux"

// Here save User
export const userSave = (state) => {
  return async (dispatch) => {
    let formData = new FormData();

    formData.append("user_fullname", state.user_fullname);
    formData.append("user_country", state.user_country);
    formData.append("user_currency", state.user_currency);
    formData.append("user_email", state.user_email);
    formData.append("user_contact", state.user_contact);
    formData.append("username", state.username);
    formData.append("user_password", state.user_password);
    formData.append("user_type", state.user_type);

    if (state.user_images) {
      formData.append("user_images", state.user_images[0]);
    }
    dispatch({ type: SET_LOADER });
    try {
      await axios.post(
        process.env.REACT_APP_API_URL + 'signUpp',
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          mode: "cors",
        }
      ).then((res) => {
        // debugger
        dispatch({ type: CLOSE_LOADER });
        dispatch({ type: "REDIRECT_TRUE" })
        dispatch({ type: REGISTER_SUCESSFULL, payload: res.data })
        dispatch({ type: "SET_MESSAGE", payload: "Successfully account created" })
      }).catch((err) => {

        console.log(err.response);
        dispatch({ type: CLOSE_LOADER });
        dispatch({
          type: REGISTER_ERRORS,
          payload: err.response.data.errors,
        });


      });
      // localStorage.setItem("mytoken", data.token);
      // dispatch({ type: SET_TOKEN, payload: data.token });
      // console.log("db data", data);
    } catch (error) {
    }

    //    if(state.product_images){
    //    [...state.product_images].forEach((image, index) => {
    //     formData.append(`product_images[]`, image);
    //   });
    // }
    // const config = {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'multipart/form-data',
    //     }
    // }
    //  try {
    //      const response = await axios.post('http://localhost:5000/api/signUpp',formData, state, config);
    //     //  dispatch({type: ADD_PRODUCT, payload: data});
    //      console.log("dataaaa", response)
    //  } catch (error) {
    //      console.log(error)
    //     // dispatch({type: ERROR_PRODUCT, payload: error.response.data.error});
    //  }
  };
};



// export const userLogIn = (state) => {
//   return async (dispatch) => {
//     let formData = new FormData();

//     formData.append("username", state.username);
//     formData.append("user_password", state.user_password);

//     dispatch({ type: SET_LOADER });
//     try {
//       await axios
//         .post("http://localhost:5000/api/signInn", state)
//         .then((res) => {
//           console.log(res);
//         });

//       // dispatch({ type: CLOSE_LOADER });

//       // localStorage.setItem("mytoken", data.token);
//       //      console.log(data.token);
//       // dispatch({ type: SET_TOKEN, payload: data.token });

//       console.log(data);
//     } catch (error) {
//       dispatch({ type: CLOSE_LOADER });
//       dispatch({
//         type: LOGIN_ERROR,
//         payload: error.response.data.errors,
//       });
//       console.log(error.response);
//     }
//   };
// };

// export const userLogIn = (state) => {
//   return async (dispatch) => {
//     let formData = new FormData();

//     formData.append("username", state.username);
//     formData.append("user_password", state.user_password);

//     // dispatch({ type: SET_LOADER });

//     await  axios
//         .post("http://localhost:5000/api/signInn", state)
//         .then((res) => {
//           console.log(res);
//         }).catch((e)=>{
//           console.log("ex",e)
//         })
//       // dispatch({ type: CLOSE_LOADER });
//       // console.log("user dataaa", data.data);
//       // localStorage.setItem("mytoken", data.token);
//       // console.log(data.token);
//       // dispatch({ type: SET_TOKEN, payload: data.token });

//   };
// };

// export const userLogIn = (state) => {
//   return async (dispatch) => {
//     const { username, user_password } = state;
//     if (username && user_password) {
//       axios.post("http://localhost:5000/api/signInn", state)
//         .then((res) => console.log(res));
//       console.log(data);
//     } else {
//       console.log("errors");
//     }
//   };
// };



export const userLogIn = (state) => {
  return async (dispatch) => {
    try {
      await axios
        .post(process.env.REACT_APP_API_URL + "signInn", state).then((res) => {

          localStorage.setItem("mytoken", res.data.token);
          dispatch({ type: LOGIN_SUCCESFULL, payload: res.data });


        }).catch((err) => {
          dispatch({ type: CLOSE_LOADER });
          debugger
          dispatch({
            type: LOGIN_ERROR,
            payload: err.response?.data.errors,
          });


        })


    } catch (error) {
      // debugger
      console.log(error?.response);
    }
  };
};
