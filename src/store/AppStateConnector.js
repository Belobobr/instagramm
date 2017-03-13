import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import SocialNetworkApp from '../components/SocialNetworkApp'
import * as navigationActionCreators from '../actions/navigation'
import * as sessionActionCreators from '../actions/session';
import * as profileActionCreators from '../actions/profile';
import * as hashActionCreators from '../actions/hash';
import * as favoritesActionCreators from '../actions/favorites';

function mapStateToProps(state) {
    return {
        navigation: state.navigation,
        session: state.session,
        profile: state.profile,
        hash: state.hash,
        favorites: state.favorites,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, navigationActionCreators, sessionActionCreators, profileActionCreators, hashActionCreators, favoritesActionCreators), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialNetworkApp)