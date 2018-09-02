import React from 'react'


class WForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            buttonText: "Predpoveď počasia na týždeň"
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {

        if (e.target.value === "daily") {
            this.setState({
                buttonText: "Predpoveď počasia na týždeň"
            })
        }
        else if (e.target.value === "currently") {
            this.setState({
                buttonText: "Aktuálne počasie"
            })
        }
        else {
            this.setState({
                buttonText: "Predpoveď na 48 hodín"
            })
        }

    }
    render() {
        return (
            <div className="d-flex justify-content-center">
                <form onSubmit={(e) => this.props.handleSubmit(e)} className="form-inline">
                    <label htmlFor="input-text" className="text-center">Lokalita: </label>
                    <input
                        id="input-text"
                        className="form-control form-control-lg w-100 p-2"
                        type="text"
                        placeholder="Mesto, adresa alebo štát" />
                    <select onChange={this.handleChange} id="options" className="form-control form-control-lg">
                        <option value="daily">Týždeň</option>
                        <option value="currently">Aktuálne</option>
                        <option value="hourly">Hodinová predpoveď</option>
                    </select>
                    <button id="main-btn" className="btn btn-outline-primary btn-lg">{this.state.buttonText}</button>
                </form>
            </div>
        )
    }
}


export default WForm