const backendDomain = "http://localhost:8080";

const SummaryApi = {
  SignUp : {
    url : `${backendDomain}/api/signup`,
    method : "POST"
  }
  , SignIn : {
    url : `${backendDomain}/api/signin`,
    method : "POST"
  }
}

export default SummaryApi;