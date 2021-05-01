import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import LoginPage from '../pages/login/LoginPage';
import NewsPage from '../pages/news/NewsPage';
import AboutUs from '../pages/aboutUs/AboutUsPage';
import Footer from '../components/Footer';
import Profile from '../pages/profile/Profile';
import RegisterPage from '../pages/register/RegisterPage';
import CoursesPage from '../pages/courses/CoursesPage';
import SliderPage from '../pages/sliders/sliderPage';
import DetailNewPage from '../pages/detailNew';
import Users from '../pages/admin/Users';
import Organization from '../pages/admin/Organization';
import AboutUsAdmin from '../pages/admin/AboutUs/AboutUs';
import Entries from '../pages/admin/Entries';
import Capacitation from '../pages/admin/Capacitation';
import OnCourses from '../pages/admin/OnCourses';
import organizationActions from '../redux/actions/organizationActions';
import EditProfile from '../components/EditProfile';
import ContactPage from '../pages/contact/ContactPage';
import Activities from '../components/ActivitiesCard';
import slidesActions from '../redux/actions/slidesActions';
import coursesActions from '../redux/actions/coursesActions';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import ResetPassword from '../components/ResetPassword';
import PasswordRecovery from '../components/PasswordRecovery';
import {
  ROUTE_ABOUT_US,
  ROUTE_ACTIVITIES,
  ROUTE_ADMIN_CAPACITATION,
  ROUTE_ADMIN_ENTRIES,
  ROUTE_ADMIN_ORGANIZATION,
  ROUTE_ADMIN_ABOUT_US,
  ROUTE_ADMIN_USERLIST,
  ROUTE_CONTACT,
  ROUTE_DETAIL_NEWS_ID,
  ROUTE_EDIT_PROFILE,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_PROFILE,
  ROUTE_REGISTER,
  ROUTE_COURSES_PAGE,
  ROUTE_ADMIN_SLIDER,
  ROUTE_ADMIN_ON_COURSES,
  ROUTE_ADMIN_INSCRIPTION,
  ROUTE_ADMIN_LIST_INSCRIPTIONS,
  ROUTE_RECOVER_PASSWORD,
  ROUTE_RESET_PASSWORD,
  ROUTE_EMAIL_VERIFICATION,
  ROUTE_EMAIL_NOT_VERIFIED,
} from '../constants/routes/routes';
import themeActions from '../redux/actions/themeActions';
import Inscriptions from '../pages/admin/Inscriptions';
import ListAllInscriptions from '../pages/admin/ListIncription';
import EmailVerificationPage from '../pages/emailVerification/EmailVerification';
import EmailNotVerified from '../components/EmailNotVerified/EmailNotVerified';

const Routes = (props) => {
  const {
    dataOrganization,
    getDataOrganization,
    getDataSlides,
    dataSlides,
    getAllCourses,
    getAllOnCourses,
    getDataTheme,
  } = props;

  useEffect(() => {
    getAllCourses();
    getAllOnCourses();
    const getData = async () => {
      await getDataOrganization()[0];
      await getDataSlides();
      await getAllCourses();
      await getDataTheme();
    };
    getData();
  }, []);

  useEffect(() => {
    document.title = dataOrganization[0]?.name || '';
    const icon = document.getElementById('icon');
    const appleIcon = document.getElementById('apple-icon');
    icon.href = dataOrganization[0]?.image;
    appleIcon.href = dataOrganization[0]?.image;
  }, [dataOrganization]);

  if (!dataOrganization.length && !dataSlides.length) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path={ROUTE_HOME} component={NewsPage} />
        <Route path={ROUTE_ABOUT_US} component={AboutUs} />
        <Route path={ROUTE_ACTIVITIES} component={Activities} />
        <Route path={ROUTE_CONTACT} component={ContactPage} />
        <Route path={ROUTE_COURSES_PAGE} component={CoursesPage} />
        <Route path={ROUTE_LOGIN} component={LoginPage} />
        <Route path={ROUTE_RESET_PASSWORD} component={ResetPassword} />
        <Route path={ROUTE_RECOVER_PASSWORD} component={PasswordRecovery} />
        <Route path={ROUTE_REGISTER} component={RegisterPage} />
        <Route
          exact
          path={ROUTE_EMAIL_VERIFICATION}
          component={EmailVerificationPage}
        />
        <PrivateRoute path={ROUTE_EDIT_PROFILE} component={EditProfile} />
        <PrivateRoute path={ROUTE_PROFILE} component={Profile} />
        <Route path={ROUTE_DETAIL_NEWS_ID} component={DetailNewPage} />
        <AdminRoute path={ROUTE_ADMIN_USERLIST} component={Users} />
        <AdminRoute path={ROUTE_ADMIN_ORGANIZATION} component={Organization} />
        <AdminRoute path={ROUTE_ADMIN_ABOUT_US} component={AboutUsAdmin} />
        <AdminRoute path={ROUTE_ADMIN_ENTRIES} component={Entries} />
        <AdminRoute
          path={ROUTE_ADMIN_LIST_INSCRIPTIONS}
          component={ListAllInscriptions}
        />
        <Route
          exact
          path={ROUTE_EMAIL_NOT_VERIFIED}
          component={EmailNotVerified}
        />
        <AdminRoute
          exact
          path={ROUTE_ADMIN_CAPACITATION}
          component={Capacitation}
        />
        <AdminRoute path={ROUTE_ADMIN_ON_COURSES} component={OnCourses} />
        <AdminRoute path={ROUTE_ADMIN_INSCRIPTION} component={Inscriptions} />
        <AdminRoute path={ROUTE_ADMIN_SLIDER} component={SliderPage} />
        <Redirect to={ROUTE_HOME} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

const mapDispatchToProps = {
  getDataOrganization: organizationActions.getDataOrganization,
  getDataSlides: slidesActions.getDataSlides,
  getDataTheme: themeActions.getDataTheme,
  getAllCourses: coursesActions.getAllCourses,
  getAllOnCourses: coursesActions.getAllOnCourses,
};

const mapStateToProps = (state) => ({
  dataOrganization: state.organization.dataOrganization,
  dataSlides: state.slides.dataSlides,
  dataThemeDefault: state.theme,
  tokenLogged: state.user.accessToken,
  roleUser: state.user.roleUser,
});

Routes.propTypes = {
  dataOrganization: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      image: propTypes.string.isRequired,
      description: propTypes.string.isRequired,
      address: propTypes.string.isRequired,
      welcomeText: propTypes.string.isRequired,
      phone: propTypes.string.isRequired,
    }),
  ),

  dataSlides: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      image: propTypes.string.isRequired,
      description: propTypes.string.isRequired,
      organizationId: propTypes.number.isRequired,
    }),
  ),

  getDataOrganization: propTypes.func,
  getDataSlides: propTypes.func,
  getAllCourses: propTypes.func.isRequired,
  getAllOnCourses: propTypes.func.isRequired,
  getDataTheme: propTypes.func,
};

Routes.defaultProps = {
  dataOrganization: [],
  dataSlides: [],
  getDataOrganization: () => {},
  getDataSlides: () => {},
  getDataTheme: () => {},
};
export default connect(mapStateToProps, mapDispatchToProps)(Routes);
