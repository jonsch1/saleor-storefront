import { mediumScreen } from "../App/scss/variables.scss";
import "./scss/index.scss";

import { ApolloClient } from "apollo-client";
import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import Media from "react-media";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { CartSummary, Loader, OverlayManager } from "..";
import { baseUrl } from "../App/routes";
import Offline from "../Offline";
import OfflinePlaceholder from "../OfflinePlaceholder";
import Online from "../Online";
import { CheckoutContext, CheckoutContextInterface } from "./context";
import { getCheckoutQuery } from "./queries";
import { Routes } from "./routes";

import logoImg from "../../images/logo.svg";

export class CheckoutProvider extends React.Component<
  {
    children: any;
    apolloClient: ApolloClient<any>;
    token: string;
    url: string;
  },
  CheckoutContextInterface
> {
  constructor(props) {
    super(props);
    this.state = {
      cardData: null,
      checkout: null,
      clearCheckout: this.clearCheckout,
      loading: false,
      updateCheckout: this.updateCheckout
    };
  }

  componentWillMount() {
    this.getCheckout();
  }

  getCheckout = async () => {
    this.setState({ loading: true });
    const { data } = await this.props.apolloClient.query({
      query: getCheckoutQuery,
      variables: { token: this.props.token }
    });
    this.setState({ ...data, loading: false });
  };

  updateCheckout = checkoutData => {
    this.setState(checkoutData);
  };

  clearCheckout = () => {
    this.setState({
      cardData: null,
      checkout: null
    });
  };

  render() {
    const { children } = this.props;
    return (
      <CheckoutContext.Provider value={this.state}>
        {children}
      </CheckoutContext.Provider>
    );
  }
}

const CheckoutApp: React.SFC<RouteComponentProps<{ match; token }>> = ({
  history,
  match: {
    url,
    params: { token = "" }
  }
}) => {
  const isReviewPage = history.location.pathname === `${url}/review/`;

  return (
    <div className="checkout">
      <div className="checkout__menu">
        <div className="checkout__menu__bar">
          <ReactSVG path={logoImg} />
        </div>
        <Link to={baseUrl}>Return to shopping</Link>
      </div>
      <div className="container">
        <Online>
          <div
            className={`checkout__grid${
              isReviewPage ? " checkout__grid--review" : ""
            }`}
          >
            <ApolloConsumer>
              {client => (
                <CheckoutProvider apolloClient={client} token={token} url={url}>
                  <CheckoutContext.Consumer>
                    {({ loading }) =>
                      loading ? (
                        <Loader />
                      ) : (
                        <>
                          <div
                            className={
                              isReviewPage ? "" : "checkout__grid__content"
                            }
                          >
                            <Routes token={token} />
                          </div>
                          {!isReviewPage ? (
                            <Media
                              query={{ minWidth: mediumScreen }}
                              render={() => <CartSummary />}
                            />
                          ) : null}
                        </>
                      )
                    }
                  </CheckoutContext.Consumer>
                </CheckoutProvider>
              )}
            </ApolloConsumer>
          </div>
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </div>
      <OverlayManager />
    </div>
  );
};

export default CheckoutApp;
