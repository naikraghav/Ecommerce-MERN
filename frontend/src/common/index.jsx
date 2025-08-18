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
  },
  logout_user: {
    url: `${backendDomain}/api/userLogout`,
    method: "GET"
  },
  allUsers: {
    url: `${backendDomain}/api/all-users`,
    method: "GET"
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "POST"
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "POST"
  }

}

export default SummaryApi;