import React, { Component } from "react";
import transStyle from "./Index.module.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: 1,
    };
  }
  render() {
    const { isAuthenticated } = this.props;
    const { formTab } = this.state;
    if (!isAuthenticated) {
      return (
        <Redirect to={{ pathname: "/", redirect_to: "/home/transactions" }} />
      );
    }
    return (
      <section className={transStyle.home}>
        <h1 className={transStyle.title}>TRANSACTIONS</h1>
        <div className={transStyle.hold}>
          <div className={transStyle.tabs}>
            <button
              onClick={() => this.setState({ ...this.state, formTab: 1 })}
              className={formTab === 1 ? transStyle.active : ""}
            >
              All
            </button>
            <button
              onClick={() => this.setState({ ...this.state, formTab: 2 })}
              className={formTab === 2 ? transStyle.active : ""}
            >
              Pending
            </button>
            <button
              onClick={() => this.setState({ ...this.state, formTab: 3 })}
              className={formTab === 3 ? transStyle.active : " "}
            >
              Active
            </button>
            <button
              onClick={() => this.setState({ ...this.state, formTab: 4 })}
              className={formTab === 4 ? transStyle.active : " "}
            >
              Successful
            </button>
            <button
              onClick={() => this.setState({ ...this.state, formTab: 5 })}
              className={formTab === 5 ? transStyle.active : " "}
            >
              Cancelled
            </button>
          </div>
          {formTab === 1 ? (
            <div></div>
          ) : formTab === 2 ? (
            <div className={transStyle.transactions}>
              <div className={transStyle.transactions_empty}>
                {/* <img src={empty} alt="empty" /> */}
                <p>You have no transactions yet!</p>
                <Link to="/home/bitcoin" className={transStyle.link_btn_gold}>
                  BUY BTC
                </Link>
              </div>
              <div className={transStyle.transactions_list}>
                <table>
                  <thead>
                    <tr>
                      <th>Trans. Type</th>
                      <th>NGN</th>
                      <th>Value</th>
                      <th>Status</th>
                      <th>Token</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Gift card - Sell</td>
                      <td className={transStyle.green}>₦ 23,000</td>
                      <td className={transStyle.green}>₦ 23,000</td>
                      <td className={transStyle.blue}>Active</td>
                      <td>xghjk453</td>
                      <td>27th Oct. 2020</td>
                      <td>
                        <Link
                          to="/home/transactions/id"
                          className={transStyle.link_btn_gold}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Gift card - Sell</td>
                      <td className={transStyle.red}>₦ 23,000</td>
                      <td className={transStyle.red}>₦ 23,000</td>
                      <td className={transStyle.red}>Cancelled</td>
                      <td>xghjk453</td>
                      <td>27th Oct. 2020</td>
                      <td>
                        <Link
                          to="/home/transactions/id"
                          className={transStyle.link_btn_gold}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Gift card - Sell</td>
                      <td className={transStyle.green}>₦ 23,000</td>
                      <td className={transStyle.green}>₦ 23,000</td>
                      <td className={transStyle.green}>Suspended</td>
                      <td>xghjk453</td>
                      <td>27th Oct. 2020</td>
                      <td>
                        <Link
                          to="/home/transactions/id"
                          className={transStyle.link_btn_gold}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {/* <img src={vc1} className={transStyle.vc} alt="vector" />
          <img src={vc2} className={transStyle.vc} alt="vector" />
          <img src={vc3} className={transStyle.vc} alt="vector" /> */}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth };
};
export default connect(mapStateToProps, null)(Home);
