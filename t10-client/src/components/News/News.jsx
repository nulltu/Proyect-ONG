import React from 'react';
import { useSelector } from 'react-redux';
import ListArticles from '../ListArticles';
import Slider from '../Slider';
import { NEWS } from '../../constants/constants';

const News = () => {
  const dataSlides = useSelector((state) => state.slides.dataSlides);

  return (
    <div data-testid="welcomeText">
      <div id="wrapper">
        <main id="main" className="site-main">
          <div>
            <Slider slides={dataSlides} />
          </div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xs-2 col-sm-10 col-md-10 col-lg-10">
                <div className="grid-post">
                  <ListArticles types={NEWS} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default News;
