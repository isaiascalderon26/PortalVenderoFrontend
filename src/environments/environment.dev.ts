export const environment = {
  production: false,
  mapbox: {
    accessToken:
      'pk.eyJ1Ijoia29hbmRpbmEiLCJhIjoiY2txbWx6OTR3MTQ4azJwbzF6NmlpNGtvYyJ9.cv5Lq4SZAbog9nettyX9Ag',
  },
  AWS_IDENTITY_POOL_ID: 'us-east-1:2f5982f8-28f5-42d9-a5c5-6ee7e12486ba',
  AWS_REGION: 'us-east-1',
  AWS_USER_POOL_ID: 'us-east-1_Msf6mIThL',
  AWS_CLIENT_ID: '6qdh5nt5jmsfqiesjvimmvcmev',
  AWS_CLIENT_SECRET: '6me1kmnkggajiuv74p3c45h2hd34siugopgc24qs0s9gksqj74t',
  redirectUri: 'https://gestion-dev.miandina.cl/home',
  redirecSignOutUri: 'https://gestion-dev.miandina.cl/auth/login',
  cognitoUri: 'sso-portalvendedores-dev.auth.us-east-1.amazoncognito.com',
  cognitoAuth_1:'https://sso-portalvendedores-dev.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=',
  cognitoAuth_2: '&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+portal_Vendedor/json.read&redirect_uri=',
  BASE_URL: 'https://0wnpqd9m50.execute-api.us-east-1.amazonaws.com/dev',
  b2bVariables:{
    cpgId: '001',
    countryId: 'CL',
    'X-B2B-Organization-Id': '3043',
  }
};
