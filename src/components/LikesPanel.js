import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import _get from 'lodash.get';
import {CONTENT_MARGIN, ICON_SIZE} from './../constants/dimensions';

export default class LikesPanel extends Component {

    render() {
        const {mediaItem} = this.props;
        const mediaItemId = _get(mediaItem, 'id');

        return <View style={styles.likesContainer}>

            <TouchableOpacity onPress={() => {
                if (_get(mediaItem, 'user_has_liked')) {
                    this.props.dislike(mediaItemId);
                } else {
                    this.props.like(mediaItemId);
                }
            }}>
                <Image
                    style={styles.likeButton}
                    source={_get(mediaItem, 'user_has_liked') ? require('./../images/icon_liked.png') : require('./../images/icon_like.png')}
                />

            </TouchableOpacity>

            <Text style={styles.likesText}>{`${_get(mediaItem, 'likes.count')} likes`}</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    likesContainer: {
        flexDirection: 'row',
        marginTop: CONTENT_MARGIN,
        marginLeft: CONTENT_MARGIN,
        marginRight: CONTENT_MARGIN,
        alignItems: 'center',
    },
    likesText: {
        fontSize: 14,
        marginLeft: CONTENT_MARGIN,
    },
    likeButton: {
        width: ICON_SIZE,
        height: ICON_SIZE,
    },
});




