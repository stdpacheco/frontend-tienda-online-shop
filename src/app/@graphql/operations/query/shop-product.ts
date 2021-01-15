import { RESULT_INFO_FRAGMENT } from './../fragment/result-info';
import gql from 'graphql-tag';
import { SHOP_PRODUCT_FRAGMENT } from '@graphql/operations/fragment/shop-product';

export const SHOP_LAST_UNITS_OFFERS = gql`
  query productoPorOfertaYStock(
    $page: Int
    $itemsPage: Int
    $active: ActiveFilterEnum
    $random: Boolean
    $topPrice: Float
    $lastUnits: Int
    $showInfo: Boolean = false
    $showPlatform: Boolean = false
    $relationScreens: Boolean = false
  ) {
    shopProductsOffersLast(
      page: $page
      itemsPage: $itemsPage
      active: $active
      topPrice: $topPrice
      lastUnits: $lastUnits
      random: $random
    ) {
      info @include(if: $showInfo) {
        ...ResultInfoObject
      }
      status
      message
      shopProducts {
        ...ShopProductObject
      }
    }
  }
  ${SHOP_PRODUCT_FRAGMENT}
  ${RESULT_INFO_FRAGMENT}
`;

export const SHOP_PRODUCT_BY_PLATFORM = gql`
  query productoPorPlataforma(
    $page: Int
    $itemsPage: Int
    $active: ActiveFilterEnum
    $random: Boolean
    $platform: [ID!]!
    $showInfo: Boolean = false
    $showPlatform: Boolean = false
    $relationScreens: Boolean = false
  ) {
    shopProductsPlatforms(
      page: $page
      itemsPage: $itemsPage
      active: $active
      platform: $platform
      random: $random
    ) {
      info @include(if: $showInfo) {
        ...ResultInfoObject
      }
      status
      message
      shopProducts {
        ...ShopProductObject
      }
    }
  }
  ${SHOP_PRODUCT_FRAGMENT}
  ${RESULT_INFO_FRAGMENT}
`;

export const SHOP_PRODUCT_DETAILS = gql`
  query detallesProducto(
    $id: Int!
    $showPlatform: Boolean = true
    $relationScreens: Boolean = true
  ) {
    shopProductDetails(id: $id) {
      shopProduct {
        ...ShopProductObject
      }
    }
  }
  ${SHOP_PRODUCT_FRAGMENT}
`;

export const SHOP_PRODUCT_RANDOM_ITEMS = gql`
  query itemsAleatorios(
    $showPlatform: Boolean = true
    $relationScreens: Boolean = false
  ){
    randomItems: shopProductsOffersLast(itemsPage: 6, random: true) {
      shopProducts {
        ...ShopProductObject
      }
    }
  }
  ${SHOP_PRODUCT_FRAGMENT}
`;
