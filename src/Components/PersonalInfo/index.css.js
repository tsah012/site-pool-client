import styled from 'styled-components'

const Wrapper = styled.div`

.footer {
  color: #92badd;
  text-decoration: none;
  font-weight: 400;
  display: inline-block;
}

.wrapper {
  display: flex;
  margin: 8px;
  margin-top: 10px;
  /* align-items: center; */
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  font-family: "Poppins", sans-serif;
}

.row {
  display: flex;
}

.infoItem {
  flex: 50%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}

.errorMessage {
  color: red;
  font-weight: bold;
}

input[type=button], input[type=submit], input[type=reset]  {
  text-align: center;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  border-radius: 5px;
  margin-right: 1%;
}

input[type=text] {
  background-color: #f6f6f6;
  color: #0d0d0d;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=text]:placeholder {
  color: #cccccc;
}

*:focus {
    outline: none;
} 

* {
  box-sizing: border-box;
}

`
  ;

export default Wrapper