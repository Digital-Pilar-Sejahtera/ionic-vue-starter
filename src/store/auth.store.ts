import {AuthenticationError, AuthService} from "@/services/auth.service";
import { TokenService } from "@/services/token.service";

const state = {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: "",
    refreshTokenPromise: null,
    user: {}
};

const getters = {
    authenticationErrorCode: (state: { authenticationErrorCode: any }) => {
        return state.authenticationErrorCode;
    },

    authenticationError: (state: { authenticationError: any }) => {
        return state.authenticationError;
    },

    authenticating: (state: { authenticating: any }) => {
        return state.authenticating;
    },
    
    user: (state: { user: any }) => {
        return state.user;
    }
};

const actions = {
    async signIn(context: any, signInData: any) {
        context.commit("signInRequest");
        return new Promise((resolve, reject) => {
            AuthService.signIn(signInData).then(res => {
                context.commit("signInSuccess", res);
                resolve(res);
            }).catch(err => {
                if (err instanceof AuthenticationError) {
                    context.commit("signInError", {
                        errorCode: err.errorCode,
                        errorMessage: err.message
                    });
                    reject(err.message);
                }
            });
        });
    },

    setUserData(context: any, user: any) {
        context.commit("setUserData", user);
    },

    signOut(context: any) {
        context.commit("signOutRequest");
        return new Promise((resolve) => {
            AuthService.signOut();
            resolve();
        });
    },

    refreshToken(context: any, state: { refreshTokenPromise: any }) {
        if (!state.refreshTokenPromise) {
            const p = AuthService.refreshToken();
            context.commit("refreshTokenPromise", p);

            p.then(
                response => {
                    context.commit("refreshTokenPromise", null);
                    context.commit("loginSuccess", response);
                },
                error => {
                    context.commit("refreshTokenPromise", error);
                }
            );
        }

        return state.refreshTokenPromise;
    },

    async signup(context: any, {email, password, name}: any) {
        try {
            await AuthService.signup(email, password, name);
            context.commit("processSuccess");
            return true;
        } catch (e) {
            if (e instanceof AuthenticationError) {
                context.commit("signInError", {
                    errorCode: e.errorCode,
                    errorMessage: e.message
                });
            }
            return false;
        }
    },

    setAuthenticatingStatus(context: any, status: any) {
        context.commit("setAuthenticatingStatus", status);
    },
};

const mutations = {
    signInRequest(state: {
        authenticating: boolean;
        authenticationError: string;
        authenticationErrorCode: number;
    }) {
        state.authenticating = true;
        state.authenticationError = "";
        state.authenticationErrorCode = 0;
    },

    signInSuccess(state: {
        accessToken: any;
        authenticating: boolean;
        user: any;
    }, data: { accessToken: any; user: any }) {
        state.accessToken = data.accessToken;
        state.authenticating = false;
        state.user = data.user;
    },

    signInError(state: {
        authenticating: boolean;
        authenticationErrorCode: any;
        authenticationError: any;
    }, {errorCode, errorMessage}: any) {
        state.authenticating = false;
        state.authenticationErrorCode = errorCode;
        state.authenticationError = errorMessage;
    },

    signOutRequest(state: { authenticating: boolean; user: any }) {
        state.authenticating = false;
        state.user = {};
    },

    refreshTokenPromise(state: { refreshTokenPromise: any }, promise: any) {
        state.refreshTokenPromise = promise;
    },

    processSuccess(state: { authenticating: boolean }) {
        state.authenticating = false;
    },

    setAuthenticatingStatus(state: { authenticating: any }, status: any) {
        state.authenticating = status;
    },
    
    setUserData(state: { user: any }, userData: any) {
        state.user = userData;
    }
};

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
