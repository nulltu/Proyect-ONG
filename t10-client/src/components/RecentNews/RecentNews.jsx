import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NEWS } from '../../constants';
import { ROUTE_DETAIL_NEWS, ROUTE_HOME } from '../../constants/routes/routes';

function RecentNews() {
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  const entries = useSelector((state) => state.entries.dataEntries);
  const entriesNews = entries.filter((entry) => entry.type === NEWS);

  return (
    <div className="col-lg-4 sidebar">
      <a href={ROUTE_HOME} style={{ color: theme.lettersColor }}>
        Volver al inicio
      </a>
      <aside
        className="widget widget-recent"
        style={{ backgroundColor: theme.tableColor }}
      >
        <h3 className="widget-title" style={{ color: theme.lettersColor }}>
          Novedades Recientes
        </h3>
        <ul>
          <li>
            {entriesNews.map((entry) => (
              <Link
                to={`${ROUTE_DETAIL_NEWS}${entry.id}`}
                key={entry.id}
                style={{ color: theme.lettersColor }}
              >
                {entry.title}
              </Link>
            ))}
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default RecentNews;
