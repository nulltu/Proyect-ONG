import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

const Entries = (props) => {
  const { Data, Component, renderViews, initRenderedViews } = props;
  const [data, setData] = useState(Data.slice(0, initRenderedViews));
  const [startPointer, setStartPointer] = useState(initRenderedViews);
  const [endPointer, setEndPointer] = useState(initRenderedViews);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const newData = Data.slice(startPointer, endPointer);
    setData(data.concat(newData));
    setStartPointer(endPointer);
  }, [endPointer]);

  const fetchData = () =>
    startPointer >= Data.length
      ? setHasMore(false)
      : setEndPointer(endPointer + renderViews);

  return (
    <div>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Cargando...</h4>}
      >
        {data.map((d) => (
          <Component
            key={d.id}
            title={d.title}
            image={d.image}
            content={d.content}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

Entries.propTypes = {
  Data: PropTypes.arrayOf(PropTypes.object).isRequired,
  Component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  renderViews: PropTypes.number.isRequired,
  initRenderedViews: PropTypes.number.isRequired,
};

export default Entries;
