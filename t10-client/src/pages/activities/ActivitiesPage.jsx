import React, { useEffect } from 'react';
import ActivitiesCard from '../../components/ActivitiesCard';
import { scrollToTop } from '../../utils/reactScroll';

function NewsPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      <ActivitiesCard />
    </div>
  );
}

export default NewsPage;
