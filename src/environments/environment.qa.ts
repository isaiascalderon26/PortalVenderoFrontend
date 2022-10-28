export const environment = {
    production: false,
    mapbox: {
        accessToken:
        'pk.eyJ1Ijoia29hbmRpbmEiLCJhIjoiY2txbWx6OTR3MTQ4azJwbzF6NmlpNGtvYyJ9.cv5Lq4SZAbog9nettyX9Ag',
    },
    AWS_IDENTITY_POOL_ID: 'us-east-1:b715ecfc-0052-4eca-9664-7c9c6093e8d6',
    AWS_REGION: 'us-east-1',
    AWS_USER_POOL_ID: 'us-east-1_wzZUPYcR2',
    AWS_CLIENT_ID: '39tlk9u4gsd4g8jppsg11j4gt0',
    AWS_CLIENT_SECRET: '14jjv50j9r9limbtjlejmrlnlj3augkk6kbevn9les1370i84h2a',
    redirectUri: 'https://gestion-qa.miandina.cl/home',
    redirecSignOutUri: 'https://gestion-qa.miandina.cl/auth/login',
    cognitoUri: 'sso-portalvendedores-qa.auth.us-east-1.amazoncognito.com',
    cognitoAuth_1: 'https://sso-portalvendedores-qa.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=',
    cognitoAuth_2: '&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+portal_Vendedor/json.read&redirect_uri=',
    BASE_URL: 'https://cye2ipqyw6.execute-api.us-east-1.amazonaws.com/qa',
    b2bVariables:{
        cpgId: '001',
        countryId: 'CL',
        'X-B2B-Organization-Id': '3043',
      }
};
