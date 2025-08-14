const backendDomain = "http://localhost:8080";

const SummaryApi = {
  SignUp : {
    url : `${backendDomain}/api/signup`,
    method : "POST"
  }
  , SignIn : {
    url : `${backendDomain}/api/signin`,
    method : "POST"
  },
  current_user:{
    url : `${backendDomain}/api/user-details`,
    method : "GET"
  }
}

export default SummaryApi;