import { store } from "@/store";
import ApiService from "./api.service";
import { TokenService } from "./token.service";

class AuthenticationError extends Error {
    errorCode: any;
    constructor(errorCode: any, message: string | undefined) {
        super(message);
        this.name = this.constructor.name;
        if (message != null) {
            this.message = message;
        }
        this.errorCode = errorCode;
    }
}

const AuthService = {
    signIn: async function(signInData: any) {
        try {
            // const response = await ApiService.post('/login', signInData);

            // mock simulate login
            let response;
            if (signInData.username === 'admin' && signInData.password === 'admin') {
                response = {
                    status: 200,
                    data: {
                        accessToken: Math.random().toString(16).substr(2, 30),
                        refreshToken: Math.random().toString(16).substr(2, 30),
                        user: {
                            name: 'Admin'
                        }
                    }
                }
            } else {
                throw {
                    status: 401,
                    response: {
                        data: {
                            errorDescription: 'Wrong username or password'
                        } 
                    } 
                }
            }

            
            TokenService.saveToken(response.data.accessToken);
            TokenService.saveRefreshToken(response.data.refreshToken);
            ApiService.setHeader();

            ApiService.mount401Interceptor();

            return {
                accessToken: response.data.accessToken,
                user: response.data.user,
            };
        } catch (error) {
            this.catchError(error);
        }
    },

    refreshToken: async function() {
        const refreshToken = TokenService.getRefreshToken();

        try {
            const response = await ApiService.post('/request-token', {
                "grant_type": "refresh_token",
                refreshToken: refreshToken
            });

            TokenService.saveToken(response.data.access_token);
            TokenService.saveRefreshToken(response.data.refresh_token);
            ApiService.setHeader();

            return response.data.access_token;
        } catch (error) {
            throw new AuthenticationError(
                error.response.status,
                error.response.data.error_description
            );
        }
    },

    signOut() {
        TokenService.removeToken();
        TokenService.removeRefreshToken();
        ApiService.removeHeader();
        ApiService.unmount401Interceptor();
    },

    signup: async function(email: any, password: any, name: any) {
        const data = {
            email: email,
            password: password,
            name: name
        };

        try {
            return await ApiService.post('/register', data);
        } catch (error) {
            this.catchError(error);
        }
    },

    authCheck: () => {
        return new Promise((resolve) => {
            if (TokenService.getToken()) {
                ApiService.setHeader();
                ApiService.mountRequestInterceptor();
                ApiService.mount401Interceptor();
                // ApiService.get('/me').then(res => {
                //     store.dispatch('auth/setUserData', res.data)
                // })
                store.dispatch('auth/setUserData', {
                    name: 'Admin'
                })
            }

            resolve(true);
        });
    },

    catchError: function(error: any) {
        let status;
        let description;

        if (error.response === undefined) {
            status = error.message;
            description = error.message;
        } else {
            status = error.response.status;
            description = error.response.data.errorDescription;
        }

        throw new AuthenticationError(status, description);
    }
}

export { AuthService, AuthenticationError };
