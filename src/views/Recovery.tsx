import * as queryString from "query-string";
import * as React from 'react';
import Container from "../components/Container";
import backend from "../utils/network";

interface IRecoveryState {
  error: string;
  formData: {
    password: string;
    confirmPassword: string;
    requestId: string;
  };
  submitting: boolean;
}

class Recovery extends React.Component<any, Partial<IRecoveryState>> {
  public state = {
    error: "",
    formData: {
      confirmPassword: "",
      password: "",
      requestId: "",
    },
    submitting: false,
  }

  constructor(props: any) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );

    const parsed = queryString.parse(props.location.search);
    const requestId = (parsed.id || "").toString();

    this.state.formData.requestId = requestId;
  }

  public render() {
    return (
      <Container>
        <h1>Password Recovery</h1>
        {this.renderForm()}
      </Container>
    )
  }

  private renderForm() {
    return (
      <form onSubmit={this.submitForm}>
        <label>
          New Password:
            <input
            type="password"
            name="password"
            autoComplete="off"
            pattern=".{8,}"
            placeholder="********"
            value={this.state.formData.password}
            onChange={this.handlePasswordChange}
            required={true}
          />
        </label>
        <p className="input-description">
          Password must be 8 or more characters.
        </p>
        <label>
          Confirm Password:
            <input
            type="password"
            name="confirmPassword"
            autoComplete="off"
            pattern=".{8,}"
            placeholder="********"
            value={this.state.formData.confirmPassword}
            onChange={this.handleConfirmPasswordChange}
            required={true}
          />
        </label>
        <p className="error">{this.state.error}</p>
        <input type="submit" value="Reset Password" />
      </form>
    )
  }

  private handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, password: value }
    });
  }
  private handleConfirmPasswordChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, confirmPassword: value }
    });
  }

  private async submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.setState({ submitting: true });

    try {
      await backend.post('/recovery', this.state.formData)
    } catch (error) {
      if (error.response.data) {
        this.setState({error: error.response.data.message, submitting: false})
      }
    }
  }
}

export default Recovery;
