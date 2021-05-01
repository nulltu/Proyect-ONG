import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Article from '../Article';
import entriesActions from '../../redux/actions/entriesActions';

function ListArticles({ types }) {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries.dataEntries);
  const activitiesFilter = entries.filter((entrie) => entrie.type === types);

  const convertDateFormat = (date) => {
    const cutDateCourse = date.slice(0, 10);
    const result = cutDateCourse.split('-').reverse().join('/');
    return result;
  };

  useEffect(() => {
    dispatch(entriesActions.getDataEntries());
  }, []);

  return (
    <>
      {activitiesFilter.map((entryNew) => (
        <Article
          entryNew={entryNew}
          convertDateFormat={convertDateFormat}
          key={entryNew.id}
        />
      ))}
    </>
  );
}

ListArticles.propTypes = {
  types: PropTypes.string.isRequired,
};

export default ListArticles;
