# A front end web application for JWT authorization

- based on umi, react, sass

- corresponding server end project: https://github.com/xuesongde/umi-app-server

- protected view: home page

if user has logined then show home page and register page, if not show login page and register page

![Image](https://bezkoder.com/wp-content/uploads/2019/10/in-depth-introduction-jwt-token-based-authentication.png)

> 在这个项目中, 实现了用户路由鉴权, 简单的注册登录等场景.

用户登录之后, 在 server 端项目生成 token 返回前端保存, 之后在 header 中携带 token 发送 Authenticated 请求, server end 在中间件校验 token 的有效性, 无效 token(过期或者没有)拦截前端请求

> 前端启用受保护路由, 未登录只能注册和登录, 登录之后可以查看 home 页面

## commit 2 add pagination

- in this commit add pagination for a table component

- when user scroll table auto load remote data
