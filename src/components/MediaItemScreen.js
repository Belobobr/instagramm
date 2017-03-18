import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import Toolbar from './Toolbar';
import AddComment from './AddComment';
import LikesPanel from './LikesPanel';
import CommentsPanel from './CommentsPanel';
import {CONTENT_MARGIN, STATUS_BAR_SIZE} from './../constants/dimensions';
import _get from 'lodash.get';

export default class MediaItemScreen extends Component {

    componentDidMount() {
        var routes = this.props.navigation.routes;
        var mediaItemId = routes[routes.length - 1].mediaItemId;

        this.props.loadComments(mediaItemId);
        this.props.enteringComment('');
    }

    render() {
        const routes = this.props.navigation.routes;
        const mediaItemId = routes[routes.length - 1].mediaItemId;
        const mediaItem = this.props.media.data[mediaItemId];
        const creatingComment = this.props.comments.creatingComment;
        const createdComment = this.props.comments.createdComment;

        return <View style={styles.container}>
            <Toolbar icon={require('./../images/icon_back_black.png')}
                     onIconClicked={this.props.handleBackAction}
                     style={styles.toolbar}
                     title="Instagramm"/>

            <Image
                style={styles.avatar}
                source={{uri: _get(mediaItem, 'images.standard_resolution.url')}}
            />

            <LikesPanel mediaItem={mediaItem} like={this.props.like} dislike={this.props.dislike}/>

            <CommentsPanel {...this.props}/>

            <AddComment
                creatingComment={creatingComment}
                createdComment={createdComment}
                onMakeComment={(() => {
                    this.props.makeComment(mediaItemId);
                }).bind(this)}
                onEnteringComment={((comment) => {
                    this.props.enteringComment(comment);
                }).bind(this)}
            />

        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    toolbar: {
        marginTop: STATUS_BAR_SIZE,
    },
    avatar: {
        marginTop: CONTENT_MARGIN,
        marginLeft: CONTENT_MARGIN,
        marginRight: CONTENT_MARGIN,
        height: 320,
    },
    tabContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    tabBar: {
        elevation: 4,
    },
});
