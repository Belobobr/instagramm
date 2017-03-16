import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {
    HORIZONTAL_CONTENT_MARGIN,
} from '../../constants/dimensions';
var {width} = Dimensions.get('window');

export default class MediaItem extends Component {
    render() {
        return <TouchableOpacity style={styles.item} onPress={(()=> {
            var pushMediaItemRoute = {
                type: 'push',
                route: {
                    key: 'mediaItem',
                    title: 'Media Item',
                    mediaItemId: this.props.mediaItemId,
                },
            };

            this.props.handleNavigate(pushMediaItemRoute);
        }).bind(this)}>
            <Image
                style={{flex: 1}}
                source={{uri: this.props.uri}}
            />
        </TouchableOpacity>

    }
}

const styles = StyleSheet.create({
    item: {
        margin: (HORIZONTAL_CONTENT_MARGIN / 2),
        width: (width / 2) - HORIZONTAL_CONTENT_MARGIN,
        height: (width / 2) - HORIZONTAL_CONTENT_MARGIN,
    },
});




