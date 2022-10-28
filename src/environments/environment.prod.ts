export const environment = {
  production: false,
  mapbox: {
    accessToken:
      'pk.eyJ1Ijoia29hbmRpbmEiLCJhIjoiY2txbWx6OTR3MTQ4azJwbzF6NmlpNGtvYyJ9.cv5Lq4SZAbog9nettyX9Ag',
  },
  AWS_IDENTITY_POOL_ID: 'us-east-1:38d8012c-743d-41b5-a14d-52eec669e125',
  AWS_REGION: 'us-east-1',
  AWS_USER_POOL_ID: 'us-east-1_Aup6DJKkZ',
  AWS_CLIENT_ID: '1pa6vcp13aotdfk3sov5itt4t8',
  AWS_CLIENT_SECRET: '1vrer3sq5ndglu1rak5j4gt1f4olq4v8d6rq07ivop2i12ckrn5e',
  redirectUri: 'https://gestion.miandina.cl/home',
  redirecSignOutUri: 'https://gestion.miandina.cl/auth/login',
  cognitoUri: 'sso-portalvendedores-prod.auth.us-east-1.amazoncognito.com',
  cognitoAuth_1: 'https://sso-portalvendedores-prod.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=',
  cognitoAuth_2: '&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+portal_Vendedor/json.read&redirect_uri=',
  BASE_URL: 'https://icl81g8za9.execute-api.us-east-1.amazonaws.com/v1',
  b2bVariables:{
    cpgId: '001',
    countryId: 'CL',
    'X-B2B-Organization-Id': '3043',
  }
};
