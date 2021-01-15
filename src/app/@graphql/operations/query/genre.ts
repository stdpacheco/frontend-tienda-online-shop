import gql from 'graphql-tag';
import { GENRE_FRAGMENT } from '@graphql/operations/fragment/genre';
import { RESULT_INFO_FRAGMENT } from '@graphql/operations/fragment/result-info';

export const GENRE_LIST_QUERY = gql`
  query genresList($page: Int, $itemsPage: Int, $active: ActiveFilterEnum) {
    genres(page: $page, itemsPage: $itemsPage, active: $active) {
      info {
        ...ResultInfoObject
      }
      status
      message
      genres {
        ...GenreObject
      }
    }
  }
  ${GENRE_FRAGMENT}
  ${RESULT_INFO_FRAGMENT}
`;
