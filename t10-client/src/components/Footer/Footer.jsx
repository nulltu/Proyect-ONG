import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useSelector } from 'react-redux';
import links from '../../constants/linksNavegation/linksNavegation';

const Footer = () => {
  const dataOrganization = useSelector(
    (state) => state.organization.dataOrganization[0],
  );
  const user = useSelector((state) => state.user);

  const socials = [
    { url: dataOrganization.facebookUrl, class: 'facebook' },
    { url: dataOrganization.instaUrl, class: 'instagram' },
    { url: dataOrganization.twitterUrl, class: 'twitter' },
  ];

  const footerText = {
    navegaciones: 'Navegaciones',
    registrarse: 'Registrate para acceder a cursos',
    registrarseButton: 'Registrarse',
    redes: 'Seguinos en nuestras redes',
    copyright: `2020 by ${dataOrganization.name}. All Rights Reserved.`,
    arriba: 'Volver arriba',
  };

  return (
    <footer id="footer" className="site-footer">
      <div className="footer-menu">
        <div className="container">
          <div style={{ textAlign: 'center' }} className="row">
            <div
              style={{ marginTop: 20 }}
              className="col-lg-4 col-sm-12 col-12"
            >
              <div className="footer-menu-item">
                <h3>{footerText.navegaciones}</h3>
                <ul>
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.url}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <br />
            <div
              style={{ marginTop: 20 }}
              className="col-lg-4 col-sm-12 col-12"
            >
              {user.isUserlogged ? null : (
                <div className="footer-menu-item newsletter">
                  <h3>{footerText.registrarse}</h3>
                  <div
                    style={{ marginLeft: 15 }}
                    className="button wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    <Link to="/registro" className="btn-secondary">
                      {footerText.registrarseButton}
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div
              style={{ marginTop: 20 }}
              className="follow footer-menu-item col-lg-4 col-sm-12 col-12"
            >
              <h3>{footerText.redes}</h3>
              <ul>
                {socials.map((social) => (
                  <li key={social.class} className={`${social.class}`}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className={`fa fa-${social.class}`}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* .footer-menu */}
      <div className="footer-copyright">
        <div className="container">
          <p className="copyright">{footerText.copyright}</p>
          <HashLink smooth to="#top" className="back-top">
            {footerText.arriba}
            <span className="ion-android-arrow-up" />
          </HashLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
