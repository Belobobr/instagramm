import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import SocialNetworkApp from '../components/SocialNetworkApp'
import * as navigationActionCreators from '../actions/navigation'
import * as sessionActionCreators from '../actions/session';
import * as profileActionCreators from '../actions/profile';
import * as hashActionCreators from '../actions/hash';
import * as favoritesActionCreators from '../actions/favorites';
import * as commentsActionCreators from '../actions/comments';
import * as likesActionCreators from '../actions/likes';

function mapStateToProps(state) {
    return {
        navigation: state.navigation,
        session: state.session,
        profile: state.profile,
        hash: state.hash,
        favorites: state.favorites,
        media: state.media,
        comments: state.comments,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        Object.assign(
            {},
            navigationActionCreators,
            sessionActionCreators,
            profileActionCreators,
            hashActionCreators,
            favoritesActionCreators,
            commentsActionCreators,
            likesActionCreators,
        ), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialNetworkApp)