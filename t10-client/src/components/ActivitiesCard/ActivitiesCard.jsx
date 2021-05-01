import React from 'react';
import ListArticles from '../ListArticles';
import { ACTIVITIES } from '../../constants';

const News = () => (
  <div id="wrapper" style={{ minHeight: '90vh' }}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xs-2 col-sm-10 col-md-10 col-lg-10">
          <div className="grid-post">
            <ListArticles types={ACTIVITIES} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default News;
