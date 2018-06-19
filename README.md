# mocky
Backend developer assessment

Clone repo and run 'npm install' to install dependancies

Features:
- Error logger using winston
- Tests using jest/supertest
- Authentication using jsonwebtoken
- Http requests using request/request-promise
- Env-vars handled using config

The app requires an environment variable to be set in order to use authentication by jsonwebtokens:

set mockyApp_jwtPrivateKey=NotSoSecure

App entry point: index.js

API endpoints


Clients:
- POST /api/client/id/:id (returns client data for the provided client id)(*)
- POST /api/client/name/:name (returns client data for a given client name)(*)
- POST /api/client/policy/:policy (returns client data for the provided policy id)(**)

Policies:
- POST /api/policies/client/:name (returns all the policies associated to a client for a given client name)(**)


(*) Can be accessed by clients with the role "admin" or "user"

(**) Can only be accessed by clients with the role "admin"

Note: all endpoints require a valid 'jsonwebtoken' to be sent in the headers with the variable 'x-auth-token'
To generate a 'jsonwebtoken' use the auth URI and provide a valid client id:
- POST /api/auth/:id (ie: /api/auth/a0ece5db-cd14-4f21-812f-966633e7be86)
