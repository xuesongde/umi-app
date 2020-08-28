import { Redirect } from 'umi';
const WithAuth = SubComponent => {
  // use user token to control login
  const isLogin = false;
  return ({ props }) => {
    console.log(props);
    if (isLogin) {
      return <SubComponent props={props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
};
export default WithAuth;
