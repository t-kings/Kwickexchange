import React, { Component } from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
import { addBank } from "../../../../../store/actions/trade";
import { apiUrl } from "../../../../../helpers/config";
import axios from "axios";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank_name: "",
      account_name: "",
      account_number: "",
      bank: {},
      errors: {
        bank_name: [],
        account_name: [],
        account_number: [],
      },
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      bank_name: [],
      account_name: [],
      account_number: [],
    };
    this.setState({
      ...this.state,
      errors,
    });
    const { account_number, account_name, bank_name, bank } = this.state;
    const { addBank } = this.props;
    if (account_name.length < 1) {
      errors.account_name.push("Account Name is required");
    }
    if (account_number.length < 1) {
      errors.account_number.push("Account Number is required");
    }
    if (bank_name.length < 1) {
      errors.bank_name.push("Bank Name is required");
    }

    if (
      errors.account_name.length > 0 ||
      errors.account_number.length > 0 ||
      errors.bank_name.length > 0
    ) {
      this.setState({
        ...this.state,
        errors,
      });
    } else {
      e.preventDefault();
      if (
        await addBank({
          account_number,
          account_name,
          bank_name,
          bank_slug: bank.slug,
          bank_name: bank.name,
          bank_code: bank.code,
          bank_type: bank.type,
          bank_currency: bank.currency,
        })
      ) {
        document.querySelector("#addBank").style.display = "none";
      }
    }
  };
  handleBank = async (e) => {
    const { account_number } = this.state;
    const { banks, showNotification } = this.props;
    const bank = banks.find((bank) => bank.code.toString() === e.target.value);
    if (e.target.value.length > 0 && account_number.length > 9) {
      try {
        const res = await axios.post(
          apiUrl + "wallet/naira/resolve",
          {
            account_number,
            bank_code: bank.code,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + this.props.accessToken,
            },
          }
        );
        if (res.status === 200) {
          this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            account_name: res.data.data.account_name,
            bank,
            errors: {
              ...this.state.errors,
              account_name: [],
            },
          });
        } else {
          this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            account_name: "",
            bank,
          });
        }
      } catch (error) {
        if (error.response?.status === 400) {
          showNotification(
            "Account Number",
            false,
            JSON.stringify(error.response?.data.data)
          );
        }
        this.setState({
          ...this.state,
          [e.target.name]: e.target.value,
          account_name: "",
          bank,
        });
      }
    } else {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
        account_name: "",
        bank,
      });
    }
  };

  handleName = async (e) => {
    const { bank_name, bank } = this.state;
    const { showNotification } = this.props;
    if (e.target.value.length > 9 && bank_name.length > 0) {
      try {
        const res = await axios.post(
          apiUrl + "wallet/naira/resolve",
          {
            account_number: e.target.value,
            bank_code: bank.code,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + this.props.accessToken,
            },
          }
        );
        if (res.status === 200) {
          this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            account_name: res.data.data.account_name,
            errors: {
              ...this.state.errors,
              account_name: [],
            },
          });
        } else {
          this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            account_name: "",
          });
        }
      } catch (error) {
        if (error.response?.status === 400) {
          showNotification(
            "Account Number",
            false,
            JSON.stringify(error.response?.data.data)
          );
        }
        this.setState({
          ...this.state,
          [e.target.name]: e.target.value,
          account_name: "",
        });
      }
    } else {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
        account_name: "",
      });
    }
  };

  componentDidMount = () => {
    const {
      account_number,
      account_name,
      bank_name,
      bank,
      actionToTake,
    } = this.props;
    if (account_number && actionToTake === "edit") {
      this.setState({
        ...this.state,
        account_number,
        account_name,
        bank_name,
        bank,
      });
    }
  };
  render() {
    const { errors, account_number, account_name, bank_name } = this.state;
    const { banks, isLoading } = this.props;
    return (
      <section
        id="addBank"
        onClick={(e) => {
          if (e.target == document.querySelector("#addBank")) {
            document.querySelector("#addBank").style.display = "none";
          }
        }}
        className={style.modal}
      >
        <div className={style.modal_item + " " + style.card}>
          <div className={style.prompt}>
            <div className={style.top}>
              <h3>Add Bank Account</h3>
            </div>
            <form className={style.box} onSubmit={this.handleSubmit}>
              <label
                className={
                  style.control_label +
                  " " +
                  (errors["bank_name"].length > 0 ? style.error : " ")
                }
                htmlFor="bank_name"
              >
                Select Bank
              </label>
              <select
                className={
                  style.form_control +
                  " " +
                  (errors["bank_name"].length > 0 ? style.error : " ")
                }
                id="bank_name_address"
                defaultValue={bank_name}
                name="bank_name"
                onChange={this.handleBank}
                required
              >
                <option value="">Select Bank</option>
                {banks.map((itm, idx) => (
                  <option key={idx} value={itm.code.toString()}>
                    {itm.name}
                  </option>
                ))}
              </select>
              {errors["bank_name"].map((item, idx) => (
                <p key={idx} className={style.error_par}>
                  {item}
                </p>
              ))}

              <label
                className={
                  style.control_label +
                  " " +
                  (errors["account_number"].length > 0 ? style.error : " ")
                }
                htmlFor="account_number"
              >
                Account Number
              </label>
              <input
                type="text"
                className={
                  style.form_control +
                  " " +
                  (errors["account_number"].length > 0 ? style.error : " ")
                }
                id="account_number_account"
                defaultValue={account_number}
                name="account_number"
                onChange={this.handleName}
                required
              />
              {errors["account_number"].map((item, idx) => (
                <p key={idx} className={style.error_par}>
                  {item}
                </p>
              ))}
              <label
                className={
                  style.control_label +
                  " " +
                  (errors["account_name"].length > 0 ? style.error : " ")
                }
                htmlFor="account_name"
              >
                Account Name
              </label>
              <input
                type="text"
                readOnly
                style={{
                  cursor: "not-allowed",
                  background: "rgb(128, 128, 128, 0.2)",
                }}
                className={
                  style.form_control +
                  " " +
                  (errors["account_name"].length > 0 ? style.error : " ")
                }
                id="account_name_naira"
                name="account_name"
                onChange={(e) => {}}
                value={account_name}
                required
              />
              {errors["account_name"].map((item, idx) => (
                <p key={idx} className={style.error_par}>
                  {item}
                </p>
              ))}
            </form>
            <div className={style.actions}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#addBank").style.display = "none";
                }}
                className={style.button + " " + style.grey}
              >
                Cancel
              </button>
              {isLoading ? (
                <div className={style.load + " " + style.link_btn_gold}>
                  <div className={style.loader}>Loading...</div>
                </div>
              ) : (
                <button
                  onClick={this.handleSubmit}
                  className={style.button + " " + style.link_btn_gold}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return { ...state.auth, ...state.resources, ...state.trade };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBank: (payload) => dispatch(addBank(payload)),
    showNotification: (type, isSuccess, message) =>
      dispatch((dispatch, getState) => {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: { type, isSuccess, message },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
