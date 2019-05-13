import ClayButton from 'components/shared/ClayButton.es';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class FilterInput extends Component {
	static propTypes = {
		disableSearch: PropTypes.bool,
		onSearchBarEnter: PropTypes.func,
		onUpdateSearchBarTerm: PropTypes.func,
		searchBarTerm: PropTypes.string
	}
	static defaultProps = {
		disableSearch: false
	};

	_handleSearchChange = event => {
		event.preventDefault();

		this.props.onUpdateSearchBarTerm(event.target.value);
	};

	_handleSearchKeyDown = event => {
		if (event.key === 'Enter' && event.currentTarget.value.trim()) {
			this.props.onSearchBarEnter();
		}
	};

	render() {
		const {disableSearch, onSearchBarEnter, searchBarTerm} = this.props;

		return (
			<div className="navbar-nav navbar-nav-expand">
				<div className="container-fluid container-fluid-max-xl">
					<div className="input-group">
						<div className="input-group-item">
							<input
								aria-label={Liferay.Language.get('search')}
								className="form-control input-group-inset input-group-inset-after"
								disabled={disableSearch}
								onChange={this._handleSearchChange}
								onKeyDown={this._handleSearchKeyDown}
								placeholder={Liferay.Language.get('contains-text')}
								type="text"
								value={searchBarTerm}
							/>

							<div className="input-group-inset-item input-group-inset-item-after">
								<ClayButton
									displayStyle={'unstyled'}
									iconName="search"
									onClick={onSearchBarEnter}
									title={Liferay.Language.get('search-icon')}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FilterInput;