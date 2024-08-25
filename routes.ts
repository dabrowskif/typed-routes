// This file is autogenerated by the Typed Route Generator.
// Do not edit this file directly as changes may be overwritten.
export const routes = {'auth': { _get: () => `/auth`, 'login': { _get: () => `/auth/login` },'register': { _get: () => `/auth/register` }, },'homepage': { _get: () => `/homepage` },'profile': { _get: () => `/profile`, '[userId]': { _get: (userId: string) => `/profile/${userId}`, 'settings': { _get: (userId: string) => `/profile/${userId}/settings`, '[settingType]': { _get: (userId: string, settingType: string) => `/profile/${userId}/settings/${settingType}` }, }, }, },}