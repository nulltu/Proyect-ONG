import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import entriesActions from '../../redux/actions/entriesActions';
import RecentNews from '../RecentNews/RecentNews';
import styles from './DetailNew.module.css';
import { ROUTE_HOME } from '../../constants/routes/routes';
import { scrollToTop } from '../../utils/reactScroll';

function DetailNew() {
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  const { id } = useParams();
  const dispatch = useDispatch();
  const entriesDetail = useSelector((state) => state.entries.entries);
  const parserContent = ReactHtmlParser(entriesDetail.content);

  useEffect(async () => {
    await dispatch(entriesActions.getDataEntriesById(id));
    scrollToTop();
  }, [id]);

  return (
    <>
      <main id="main" className="site-main">
        <div className="container" style={{ minHeight: '90vh' }}>
          <div className="row">
            <div className="col-lg-8 main-content">
              <article className="post">
                <div className="entry-content">
                  <img
                    src={entriesDetail.image}
                    alt=""
                    style={{ maxHeight: '600px' }}
                  />
                  <h3
                    className={styles.title}
                    style={{ color: theme.lettersColor }}
                  >
                    {entriesDetail.title}
                  </h3>
                  <ul className="post-meta">
                    <li>
                      <i
                        className="fa fa-calendar-check-o"
                        aria-hidden="true"
                        style={{ color: theme.lettersColor }}
                      />
                      <Moment
                        format="D MMM YYYY"
                        withTitle
                        style={{ color: theme.lettersColor }}
                      >
                        {entriesDetail.createdAt}
                      </Moment>
                    </li>
                    <li>
                      <i
                        className="fa fa-folder-o"
                        aria-hidden="true"
                        style={{ color: theme.lettersColor }}
                      />
                      <Link
                        to={ROUTE_HOME}
                        style={{ color: theme.lettersColor }}
                      >
                        Novedades
                      </Link>
                    </li>
                  </ul>
                  <p style={{ color: theme.lettersColor }}>{parserContent}</p>
                </div>
              </article>
            </div>
            <RecentNews />
          </div>
        </div>
      </main>
    </>
  );
}

export default DetailNew;
