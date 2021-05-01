import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import * as style from './AboutUsPage.module.css';
import historyAction from '../../redux/actions/historyAction';
import { scrollToTop } from '../../utils/reactScroll';

function AboutUsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(historyAction.getDataHistory());
    scrollToTop();
  }, []);

  const dataHistory = useSelector((state) => state.history.dataHistory);
  const theme = useSelector((state) => state.theme.dataThemeDefault);

  return (
    <div
      className="container text-center"
      data-testid="aboutUs"
      style={{ minHeight: '130vh' }}
    >
      <div className="col">
        <div className="shop-details-content">
          {dataHistory.map((singleHistory) => (
            <article className="post">
              <div className="shop-detail-img">
                <div
                  id="owl-shop"
                  className="shop-slider owl-carousel owl-theme"
                  style={{ opacity: 1, display: 'block' }}
                >
                  <div className="text-center">
                    <div style={{ maxWidth: '710px', margin: '30px auto' }}>
                      <img src={singleHistory.image} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <p
                className={`card-title text-center ${style.font}`}
                style={{ color: theme.lettersColor }}
              >
                {ReactHtmlParser(singleHistory.text)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
