import React, { useEffect } from 'react';
import News from '../../components/News';
import { scrollToTop } from '../../utils/reactScroll';

function NewsPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div style={{ minHeight: '120vh' }}>
      <News />
    </div>
  );
}

export default NewsPage;
