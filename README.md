generate token : JWT_SECRET=1AQrPWV6jXbvEpFJFgED1lFoKhBi404LbzXWOGC6KwDppEuxEekrsIQlcyrbNMTC

//sample request using accepts -application/js

http://127.0.0.1:8000/api/v1/auth/login
{
"email" : "webportal@test.com"
}

{
"access_token": "
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzA1ODE0OTIzLCJleHAiOjE3MDU4MTg1MjMsIm5iZiI6MTcwNTgxNDkyMywianRpIjoiVkR1c0lxeEdtQ2VVYm54RSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.K_FcWD8GyEdXeF4fTvIGkOKuTpKSOHf_v2gBtVMnGFU",
"token_type": "bearer",
"expires_in": 3600
}



//aunthenticated profile 


http://127.0.0.1:8000/api/v1/auth/profile
{
"id": 1,
"email": "webportal@test.com",
"email_verified_at": null,
"created_at": "2024-01-21T05:28:43.000000Z",
"updated_at": "2024-01-21T05:28:43.000000Z"
}