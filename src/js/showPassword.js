export function showPassword(...inputPassword){
    inputPassword.forEach((e) => {
      if (e.type === "password") {
        e.type = "text"
      }else{
        e.type = "password"
      }
    })
  
  }