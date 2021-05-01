import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import styles from '../News/News.module.css';
import { ROUTE_DETAIL_NEWS } from '../../constants/routes/routes';

function Article({ entryNew: { title, content, image, createdAt, id } }) {
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  const parserContent = ReactHtmlParser(content);
  return (
    <>
      <article className="post" id={styles.container}>
        <Link
          className="overlay"
          href="blog_details.html"
          to={`${ROUTE_DETAIL_NEWS}${id}`}
        >
          <img src={image} alt="" style={{ maxHeight: '600px' }} />
          <span className="ion-ios-search-strong" />
        </Link>
        <div
          className="post-info"
          id={styles.content}
          style={{ backgroundColor: theme.tableColor }}
        >
          <h3 className="post-title" style={{ overflow: 'visible' }}>
            <span
              href="blog_details.html"
              className={styles.title}
              style={{ color: theme.lettersColor }}
            >
              {title}
            </span>
          </h3>
          <ul className="post-meta">
            <li>
              <i
                className="fa fa-calendar-check-o"
                aria-hidden="true"
                style={{ color: theme.lettersColor }}
              />
              <span href="#" className={styles.date}>
                <Moment
                  format="D MMM YYYY"
                  withTitle
                  style={{ color: theme.lettersColor }}
                >
                  {createdAt}
                </Moment>
              </span>
            </li>
          </ul>
          <div className="post-desc">
            <p style={{ color: theme.lettersColor }}>{parserContent}</p>
          </div>
        </div>
      </article>
    </>
  );
}

Article.propTypes = {
  entryNew: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
