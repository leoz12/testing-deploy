import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query product {
    product {
      uuid
      timeStamp
      productName
      productPrice
      productFreshness
      productCategory
      no
    }
  }
`;
