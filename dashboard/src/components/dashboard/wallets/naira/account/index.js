import React, { Component } from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
import { addBank } from "../../../../../store/actions/trade";
import bank from "../bank";
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
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
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
                onChange={(e) => {
                  this.handleChange(e);
                  this.setState({
                    bank: banks.find(
                      (bank) => bank.code.toString() === e.target.value
                    ),
                  });
                }}
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
                  (errors["account_name"].length > 0 ? style.error : " ")
                }
                htmlFor="account_name"
              >
                Account Name
              </label>
              <input
                type="text"
                className={
                  style.form_control +
                  " " +
                  (errors["account_name"].length > 0 ? style.error : " ")
                }
                id="account_name_naira"
                name="account_name"
                onChange={this.handleChange}
                defaultValue={account_name}
                required
              />
              {errors["account_name"].map((item, idx) => (
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
                onChange={this.handleChange}
                required
              />
              {errors["account_number"].map((item, idx) => (
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
